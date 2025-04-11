import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { apiClient } from "@/(shared)/lib/reactQueryProvider";
import { ApiResponse } from "@/(shared)/types";
import {
  getLoginInfo,
  removeAccessToken,
  setLoginInfo,
} from "@/(shared)/auth/storageUtil";
import { useIsLoggedInWrite } from "@/(shared)/atoms/account.atom";

type Request = void;

export type data = {
  shopName: string;
  adminCode: string;
  grantType: string;
  accessToken: string;
  accessTokenExpiresIn: string;
  refreshToken: string;
  shopId: string;
  isComplete: boolean;
};

type Response = ApiResponse<data>;

const URL_PATH = "/v1/auth/login/google/callback";

const getGoogleCallback = async (code: string) => {
  const res = await apiClient.get<Request, AxiosResponse<Response>>(URL_PATH, {
    params: { code },
  });

  return res.data;
};

export const useGetGoogleCallbackData = (code: string) => {
  const loginInfo = getLoginInfo();
  const setIsLoggedIn = useIsLoggedInWrite();
  const { data, isLoading } = useQuery<Response, AxiosError, data>({
    queryKey: [`google-callback-${code}`],
    queryFn: () => getGoogleCallback(code),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select: (res) => res.data,
    onSuccess: (data) => {
      if (data.isComplete) {
        setLoginInfo({
          accessToken: data.accessToken.replace(/^"(.*)"$/, "$1"),
          refreshToken: data.refreshToken,
          shopName: data.shopName,
          adminCode: data.adminCode,
          accessTokenExpiresIn: data.accessTokenExpiresIn,
        });
        setIsLoggedIn(true);
      } else {
        setLoginInfo({
          ...loginInfo,
          accessToken: data.accessToken,
        });
      }
    },
    onError: (error: unknown) => {
      removeAccessToken();
      console.error(error);
      window.location.href = "/login";
    },
  });

  return { data, isLoading };
};
