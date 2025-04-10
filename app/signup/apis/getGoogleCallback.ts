import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { apiClient } from "@/(shared)/lib/reactQueryProvider";
import { ApiResponse } from "@/(shared)/types";

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
  const { data, isLoading } = useQuery<Response, AxiosError, data>({
    queryKey: ["google-callback", code],
    queryFn: () => getGoogleCallback(code),
    select: (res) => res.data,
    onError: (error: unknown) => {
      console.error(error);
    },
  });

  return { data, isLoading };
};
