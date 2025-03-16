import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useSnackBarInfo } from "@/(shared)/atoms/snackBar.atom";
import useAnalytics from "@/(shared)/hooks/useAnalytics";
import { getCookie } from "@/(shared)/auth/cookie";

const useSignUpSuccess = () => {
  const [isWebView, setIsWebView] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { userAgent } = window.navigator;
      const mwebviewRegex = /APP_NEXTROOM_ANDROID/i;
      setIsWebView(mwebviewRegex.test(userAgent));
    }
  }, []);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [snackInfo, setSnackBarInfo] = useSnackBarInfo();
  const router = useRouter();

  const { logEvent } = useAnalytics();

  useEffect(() => {
    logEvent("screen_view", {
      firebase_screen: "sign_up_success",
      firebase_screen_class: "sign_up_success",
    });
  }, []);

  useEffect(() => {
    if (isFinished) {
      setTimeout(() => {
        setSnackBarInfo({ ...snackInfo, isOpen: false });
      }, 2000);
    }
  }, [setSnackBarInfo, isFinished, snackInfo]);

  const browserPreventEvent = () => {
    history.pushState(null, "", location.href);
    const url = isWebView ? "/" : getCookie();
    router.push(url);
  };

  useEffect(() => {
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", () => {
      browserPreventEvent();
    });
    return () => {
      window.removeEventListener("popstate", () => {
        browserPreventEvent();
      });
    };
  }, []);

  const rightImageProps = {
    src: "/images/svg/icon_right.svg",
    alt: "allow",
    width: 24,
    height: 24,
  };

  return {
    isWebView,
    isFinished,
    setIsFinished,
    setSnackBarInfo,
    snackInfo,
    rightImageProps,
  };
};

export default useSignUpSuccess;
