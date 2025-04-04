import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { useSnackBarWrite } from "@/(shared)/atoms/snackBar.atom";
import { apiClient } from "@/(shared)/lib/reactQueryProvider";
import { ApiError, ApiResponse, MutationConfigOptions } from "@/(shared)/types";
import { setLoginInfo } from "@/(shared)/auth/storageUtil";
import { useIsLoggedInWrite } from "@/(shared)/atoms/account.atom";

interface Request {
  email: string;
  password: string;
}

interface LoginResponse {
  shopName: string;
  adminCode: string;
  accessToken: string;
  accessTokenExpiresIn: number;
  grantType: string;
  refreshToken: string;
}

type Response = ApiResponse<LoginResponse>;

const URL_PATH = `/v1/auth/login`;
const MUTATION_KEY = [URL_PATH];

export const postLogin = async (data: Request) => {
  const res = await apiClient.post<Request, AxiosResponse<Response>>(
    URL_PATH,
    data
  );
  return res.data;
};

export const usePostLogin = (configOptions?: MutationConfigOptions) => {
  const setIsLoggedIn = useIsLoggedInWrite();
  const setSnackBar = useSnackBarWrite();
  const queryClient = useQueryClient();

  const info = useMutation<Response, AxiosError<ApiError>, Request, void>({
    mutationKey: MUTATION_KEY,
    mutationFn: (req) => postLogin(req),
    ...configOptions?.options,
    onSuccess: (res) => {
      const { data } = res;

      if (data?.accessToken) {
        setLoginInfo({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          shopName: data.shopName,
          adminCode: data.adminCode,
          accessTokenExpiresIn: data.accessTokenExpiresIn,
        });
        setIsLoggedIn(true);

        queryClient.invalidateQueries({ queryKey: ["/v1/theme"] });
      }
    },
    onError: (error: unknown) => {
      setSnackBar({
        isOpen: true,
        message: `${
          (error as AxiosError<{ message?: string }>)?.response?.data
            ?.message || error
        }`,
      });
    },
  });

  return info;
};
