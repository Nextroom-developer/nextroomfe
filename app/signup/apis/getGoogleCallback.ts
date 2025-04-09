import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { apiClient } from "@/(shared)/lib/reactQueryProvider";
import { ApiResponse } from "@/(shared)/types";

type Request = void;
interface GoogleRequest {
  code: string;
}
export type data = {
  code: number;
  message: string;
  data: {
    shopName: string;
    adminCode: string;
    grantType: string;
    accessToken: string;
    accessTokenExpiresIn: string;
    refreshToken: string;
    shopId: string;
    isComplete: boolean;
  };
};

type Response = ApiResponse<data>;

const URL_PATH = "/api/v1/auth/login/google/callback";
export const QUERY_KEY = [URL_PATH];

export const getGoogleCallback = async (params: GoogleRequest) => {
  const res = await apiClient.get<Request, AxiosResponse<Response>>(URL_PATH, {
    params: params,
  });
  // console.log(res, "getGoogleCallback");
  return res.data;
};

export const useGetThemeList = (code: GoogleRequest) => {
  const info = useQuery<Response, AxiosError, data>({
    queryKey: QUERY_KEY,
    queryFn: () => getGoogleCallback(code),
    select: (res) => res.data,
    onSuccess: (data) => {
      if (data.code === 401) {
        return;
      }
    },
    onError: (error: unknown) => {
      console.error(error, "2323");
    },
  });

  return {
    info,
  };
};
