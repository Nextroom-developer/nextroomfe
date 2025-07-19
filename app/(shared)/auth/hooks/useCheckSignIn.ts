import { apiClient } from "@/(shared)/lib/reactQueryProvider";
import { getLoginInfo } from "@/(shared)/auth/storageUtil";
import { useIsLoggedIn } from "@/(shared)/atoms/account.atom";

const useCheckSignIn = () => {
  const { accessToken, refreshToken, shopName } = getLoginInfo();
  const [isLoggedIn, setIsLoggedIn] = useIsLoggedIn();

  if (accessToken && refreshToken && shopName) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken.replace(
      /^"(.*)"$/,
      "$1"
    )}`;
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(false);
  }

  return accessToken && isLoggedIn;
};

export default useCheckSignIn;
