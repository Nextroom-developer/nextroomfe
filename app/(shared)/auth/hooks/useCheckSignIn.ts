import { useEffect } from "react";

import { apiClient } from "@/(shared)/lib/reactQueryProvider";
import { getLoginInfo } from "@/(shared)/auth/storageUtil";
import { useIsLoggedIn } from "@/(shared)/atoms/account.atom";

import { getSubscriptionPlan } from "../../../admin/apis/getSubscriptionPlan";

const useCheckSignIn = () => {
  const { accessToken, refreshToken, shopName } = getLoginInfo();
  const [isLoggedIn, setIsLoggedIn] = useIsLoggedIn();

  useEffect(() => {
    if (accessToken && refreshToken && shopName) {
      apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken.replace(
        /^"(.*)"$/,
        "$1"
      )}`;
      setIsLoggedIn(true);
      getSubscriptionPlan();
    } else {
      setIsLoggedIn(false);
    }
  }, [accessToken, refreshToken, shopName, setIsLoggedIn]);

  return accessToken && isLoggedIn;
};

export default useCheckSignIn;
