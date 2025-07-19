import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { apiClient } from "@/(shared)/lib/reactQueryProvider";
import { ApiError, ApiResponse, MutationConfigOptions } from "@/(shared)/types";
import {
  getLoginInfo,
  removeLocalStorageAll,
} from "@/(shared)/auth/storageUtil";

import { QUERY_KEY } from "../../admin/apis/hint/getHintList";

interface Request {
  name: string;
  signupSource: string;
  comment: string;
  type: number;
  adsConsent: boolean;
}
interface SignUpResponse {
  code: number;
  message: string;
}
type Response = ApiResponse<SignUpResponse>;

const URL_PATH = `/v1/auth/shop`;
const MUTATION_KEY = [URL_PATH];

export const putSignUpWithGoogle = async (req: Request) => {
  const { accessToken } = getLoginInfo();
  if (accessToken) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken.replace(
      /^"(.*)"$/,
      "$1"
    )}`;
  }
  const res = await apiClient.put<Request, AxiosResponse<Response>>(
    URL_PATH,
    req
  );

  return res.data;
};

export const usePutSignUpWithGoogle = (
  configOptions?: MutationConfigOptions
) => {
  const queryClient = useQueryClient();

  const info = useMutation<Response, AxiosError<ApiError>, Request, void>({
    mutationKey: MUTATION_KEY,
    mutationFn: (req) => putSignUpWithGoogle(req),
    ...configOptions?.options,
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
    },
    onError: () => {
      removeLocalStorageAll();
      window.alert("세션이 만료되어 로그인 화면으로 이동합니다.");
      window.location.href = "/login";
    },
  });

  return info;
};
