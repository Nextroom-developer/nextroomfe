import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { useToastWrite } from "@/(shared)/atoms/toast.atom";
import { apiClient } from "@/(shared)/lib/reactQueryProvider";
import { MutationConfigOptions } from "@/(shared)/types";
import { QUERY_KEY } from "@/admin/apis/theme/getThemeList";

interface Request {
  id: number;
}
type Response = void;

const URL_PATH = `/v1/theme`;
const MUTATION_KEY = [URL_PATH];

export const deleteTheme = async (req: Request) => {
  const res = await apiClient.delete<Request, AxiosResponse<Response>>(
    URL_PATH,
    { data: req }
  );

  return res.data;
};

export const useDeleteTheme = (configOptions?: MutationConfigOptions) => {
  const queryClient = useQueryClient();
  const setToast = useToastWrite();

  const info = useMutation<Response, void, Request, void>({
    mutationKey: MUTATION_KEY,
    mutationFn: (req) => deleteTheme(req),
    ...configOptions?.options,
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
      setToast({
        isOpen: true,
        title: "테마를 삭제했습니다.",
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
