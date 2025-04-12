import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { apiClient } from "@/(shared)/lib/reactQueryProvider";
import { ApiResponse, QueryConfigOptions } from "@/(shared)/types";

import { useToastWrite } from "../../../(shared)/atoms/toast.atom";

type Request = { themeId: number };
export type Hints = {
  id: number;
  hintTitle: string;
  hintCode: string;
  contents: string;
  answer: string;
  progress: number;
  hintImageUrlList: string[];
  answerImageUrlList: string[];
}[];

type Response = ApiResponse<Hints>;

const URL_PATH = `/v1/hint`;
export const QUERY_KEY = [URL_PATH];

export const getHintList = async (
  req: Request,
  config?: AxiosRequestConfig
) => {
  const res = await apiClient.get<Request, AxiosResponse<Response>>(
    `${URL_PATH}?themeId=${req.themeId}`,
    {
      ...config,
      params: {
        ...config?.params,
      },
    }
  );

  return res.data;
};

export const useGetHintList = (
  req: Request,
  configOptions?: QueryConfigOptions
) => {
  const setToast = useToastWrite();

  const info = useQuery<Response, Request, Hints>({
    queryKey: [...QUERY_KEY, req],
    queryFn: () => getHintList(req, configOptions?.config),
    select: (res) => res.data,
    enabled: req.themeId > 0,
    ...configOptions?.options,
    onError: (error: unknown) => {
      setToast({
        isOpen: true,
        title: `${
          (error as AxiosError<{ message?: string }>)?.response?.data
            ?.message || error
        }`,
        text: "",
      });
    },
  });

  return info;
};
