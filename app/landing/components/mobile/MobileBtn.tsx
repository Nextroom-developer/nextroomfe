import { JSX } from "react";
import "@/(shared)/utils/firebase";
import { useRouter } from "next/navigation";

import { setCookie } from "@/(shared)/auth/helpers/cookie";
import { handleClickGoogle } from "@/(shared)/auth/hooks/useAuth";

import useCheckSignIn from "../../../(shared)/auth/hooks/useCheckSignIn";
import useAnalytics from "../../../(shared)/hooks/useAnalytics";

export default function Inputbar(): JSX.Element | null {
  const router = useRouter();
  const isSignIn = useCheckSignIn();
  const { logEvent } = useAnalytics();

  const navigateToTrial = () => {
    if (isSignIn) {
      router.push("/admin");
    } else {
      handleClickGoogle();
    }
    setCookie("/");
    logEvent("btn_click", {
      btn_name: "homepage_start_free_trial_click",
      btn_position: "floating",
    });
  };

  // const toggleVisibility = () => {
  //   if (
  //     window.scrollY > 0 &&
  //     window.scrollY < document.body.scrollHeight - window.innerHeight
  //   ) {
  //     setIsVisible(true);
  //   } else {
  //     setIsVisible(false);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", toggleVisibility);

  //   return () => {
  //     window.removeEventListener("scroll", toggleVisibility);
  //   };
  // }, []);

  return (
    <button className="main-btn" onClick={navigateToTrial}>
      {" "}
      지금 바로 시작하기{" "}
    </button>
  );
}
