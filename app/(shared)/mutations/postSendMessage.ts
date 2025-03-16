import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { useSignUpWrite } from "@/(shared)/atoms/signup.atom";
import { useSnackBarWrite } from "@/(shared)/atoms/snackBar.atom";
import { apiClient } from "@/(shared)/lib/reactQueryProvider";
import { ApiError, ApiResponse, MutationConfigOptions } from "@/(shared)/types";

import { QUERY_KEY } from "../../(shared)/queries/getHintList";

interface Request {
  email: string;
}
interface SendMessageResponse {
  code: number;
  message: string;
}
type Response = ApiResponse<SendMessageResponse>;

const URL_PATH = `/v1/email/verification-requests`;
const MUTATION_KEY = [URL_PATH];

export const postSendMessage = async (req: Request) => {
  const res = await apiClient.post<Request, AxiosResponse<Response>>(
    URL_PATH,
    req
  );

  return res.data;
};

export const usePostSendMessage = (configOptions?: MutationConfigOptions) => {
  const queryClient = useQueryClient();
  const setSignUpState = useSignUpWrite();
  const setSnackBar = useSnackBarWrite();

  const info = useMutation<Response, AxiosError<ApiError>, Request, void>({
    mutationKey: MUTATION_KEY,
    mutationFn: (req) => postSendMessage(req),
    ...configOptions?.options,
    onSuccess: (res, req) => {
      setSnackBar({
        isOpen: true,
        message: `인증번호를 보냈습니다.`,
      });
      queryClient.invalidateQueries(QUERY_KEY);
      setSignUpState({ level: 2, email: req.email, password: "" });
      // console.log("성공 시 실행")
    },
    onSettled: () => {
      //   console.log("항상 실행");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return info;
};
