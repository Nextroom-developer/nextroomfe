import { useRouter, usePathname } from "next/navigation";

import { useIsLoggedInWrite } from "../../atoms/account.atom";
import { useAsPathStateWrite } from "../../atoms/signup.atom";
import { removeAccessToken, setLoginInfo } from "../storageUtil";
import useChannelTalk from "../../hooks/useChannelTalk";

import useCheckSignIn from "./useCheckSignIn";

const useAuth = () => {
  const setIsLoggedIn = useIsLoggedInWrite();

  const router = useRouter();
  const pathName = usePathname();
  const isSignIn = useCheckSignIn();
  const setAsPathState = useAsPathStateWrite();
  const handleLogout = () => {
    removeAccessToken();
    setLoginInfo({
      accessToken: "",
      accessTokenExpiresIn: "",
      refreshToken: "",
      adminCode: "",
      shopName: "",
    });
    setIsLoggedIn(false);
  };
  setAsPathState(pathName);

  useChannelTalk();

  const handleSignUpBtn = () => {
    const url = isSignIn ? "/admin" : "/signup";
    router.push(url);
  };

  const handleLoginBtn = () => {
    isSignIn ? handleLogout() : router.push("/login");
  };

  const LoginLinkProps = {
    title: isSignIn ? "로그아웃" : "로그인",
    onClick: handleLoginBtn,
  };

  const SignUpLinkProps = {
    title: isSignIn ? "관리자 페이지로 가기" : "무료로 시작하기",
    onClick: handleSignUpBtn,
  };

  return {
    LoginLinkProps,
    SignUpLinkProps,
  };
};

export default useAuth;
