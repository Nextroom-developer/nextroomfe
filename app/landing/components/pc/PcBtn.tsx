import { useEffect, useState, JSX } from "react";
import "@/(shared)/apis/firebase";
import { useRouter } from "next/navigation";

import { setCookie } from "@/(shared)/utils/cookie";

import useCheckSignIn from "../../hooks/useCheckSignIn";
import useAnalytics from "../../hooks/useAnalytics";

export default function Inputbar(): JSX.Element | null {
  const [isVisible, setIsVisible] = useState(false);
  const { logEvent } = useAnalytics();
  const router = useRouter();
  const isSignIn = useCheckSignIn();

  const navigateToTrial = () => {
    const url = isSignIn ? "/admin" : "/signup";
    setCookie("/");
    router.push(url);
    logEvent("btn_click", {
      firebase_screen: "homepage_input_contact",
      firebase_screen_class: "homepage_input_contact",
    });
  };

  const toggleVisibility = () => {
    if (
      window.scrollY > 0 &&
      window.scrollY < document.body.scrollHeight - window.innerHeight
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return isVisible ? (
    <button className="pc-main-btn" onClick={navigateToTrial}>
      {" "}
      지금 바로 시작하기{" "}
    </button>
  ) : null;
}
