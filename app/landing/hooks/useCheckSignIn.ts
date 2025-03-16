import { useEffect } from "react";

import { apiClient } from "@/(shared)/lib/reactQueryProvider";
import { getLoginInfo } from "@/(shared)/utils/storageUtil";
import { useIsLoggedIn } from "@/(shared)/atoms/account.atom";

import { getSubscriptionPlan } from "../../(shared)/queries/getSubscriptionPlan";

const useCheckSignIn = () => {
  const { accessToken } = getLoginInfo();
  const [isLoggedIn, setIsLoggedIn] = useIsLoggedIn();

  useEffect(() => {
    if (accessToken) {
      apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken.replace(
        /^"(.*)"$/,
        "$1"
      )}`;
      setIsLoggedIn(true);
      getSubscriptionPlan();
    }
  }, [accessToken, setIsLoggedIn]);

  return accessToken && isLoggedIn;
};

export default useCheckSignIn;
