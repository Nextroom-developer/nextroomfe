import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { useToastWrite } from "@/(shared)/atoms/toast.atom";
import { apiClient } from "@/(shared)/lib/reactQueryProvider";
import { MutationConfigOptions } from "@/(shared)/types";
import { QUERY_KEY } from "@/(shared)/queries/getThemeList";

interface Request {
  id: number;
  title: string;
  timeLimit: number;
}
type Response = void;

const URL_PATH = `/v1/theme`;
const MUTATION_KEY = [URL_PATH];

export const putTheme = async (req: Request) => {
  const res = await apiClient.put<Request, AxiosResponse<Response>>(
    URL_PATH,
    req
  );

  return res.data;
};

export const usePutTheme = (configOptions?: MutationConfigOptions) => {
  const queryClient = useQueryClient();
  const setToast = useToastWrite();
  const info = useMutation<Response, void, Request, void>({
    mutationKey: MUTATION_KEY,
    mutationFn: (req) => putTheme(req),
    ...configOptions?.options,
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);

      setToast({
        isOpen: true,
        title: "테마 정보를 수정했습니다.",
        text: "",
      });
    },
    onSettled: () => {
      //   console.log("항상 실행");
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
