import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
} from "axios";

import { useToastWrite } from "@/(shared)/atoms/toast.atom";
import { apiClient } from "@/(shared)/lib/reactQueryProvider";
import { MutationConfigOptions } from "@/(shared)/types";
import { QUERY_KEY } from "@/admin/apis/theme/getThemeList";

interface Request {
  title: string;
  timeLimit: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PostThemeResponseType<T = any, D = any> {
  id: number;
  data: T;
  status: number;
  statusText: string;
  code: number;
  message: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
}

const URL_PATH = `/v1/theme`;
const MUTATION_KEY = [URL_PATH];

export const postTheme = async (
  req: Request
): Promise<AxiosResponse<PostThemeResponseType>> => {
  const res = await apiClient.post<
    Request,
    AxiosResponse<PostThemeResponseType>
  >(URL_PATH, req);
  return res;
};

export const usePostTheme = (configOptions?: MutationConfigOptions) => {
  const queryClient = useQueryClient();
  const setToast = useToastWrite();

  const info = useMutation<
    AxiosResponse<PostThemeResponseType>,
    void,
    Request,
    void
  >({
    mutationKey: MUTATION_KEY,
    mutationFn: (req) => postTheme(req),
    ...configOptions?.options,
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
      setToast({
        isOpen: true,
        title: "테마를 추가했습니다.",
        text: "",
      });
    },
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
