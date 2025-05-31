import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";

import { useSelectedThemeWrite } from "@/(shared)/atoms/selectedTheme.atom";
import { apiClient } from "@/(shared)/lib/reactQueryProvider";
import { ApiResponse, QueryConfigOptions } from "@/(shared)/types";
import { useIsLoggedInValue } from "@/(shared)/atoms/account.atom";
import {
  getSelectedThemeId,
  setSelectedThemeId,
} from "@/(shared)/auth/storageUtil";

import { useToastWrite } from "../../../(shared)/atoms/toast.atom";

type Request = void;
export type Theme = {
  id: number;
  title: string;
  timeLimit: number;
  hintLimit: number;
};

export type Themes = Theme[];

type Response = ApiResponse<Themes>;

const URL_PATH = `/v1/theme`;
export const QUERY_KEY = [URL_PATH]; // TODO - 유저 id를 키에 추가해야 함

export const getThemeList = async (config?: AxiosRequestConfig) => {
  const res = await apiClient.get<Request, AxiosResponse<Response>>(URL_PATH, {
    ...config,
    params: {
      ...config?.params,
    },
  });

  return res.data;
};

export const useGetThemeList = (configOptions?: QueryConfigOptions) => {
  const setToast = useToastWrite();
  const isLoggedIn = useIsLoggedInValue();
  const setSelectedTheme = useSelectedThemeWrite();
  const info = useQuery<Response, AxiosError, Themes>({
    queryKey: QUERY_KEY,
    queryFn: () => getThemeList(configOptions?.config),
    ...configOptions?.options,
    select: (res) => res.data,
    enabled: !!isLoggedIn,
    onSuccess: (data: Themes) => {
      const selectedThemeId = getSelectedThemeId();
      if (data.length > 0) {
        if (
          !data.some((item: Theme) => item.id.toString() === selectedThemeId)
        ) {
          setSelectedThemeId(data[data.length - 1].id);
          setSelectedTheme(data[data.length - 1]);
        } else {
          const selectedItem = data.find(
            (item: Theme) => item.id.toString() === selectedThemeId
          );
          if (selectedItem) setSelectedTheme(selectedItem);
        }
      } else setSelectedThemeId(0);
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

  return {
    ...info,
    isInitialLoading: info.isLoading,
    isRefetching: info.isFetching && !info.isLoading,
    isLoading: info.isLoading,
  };
};
