"use client";

import "./styles/signup.modules.sass";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useSignUpValue } from "@/(shared)/atoms/signup.atom";
import { getCookie } from "@/(shared)/auth/helpers/cookie";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isWebView, setIsWebView] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { userAgent } = window.navigator;
      const mwebviewRegex = /APP_NEXTROOM_ANDROID/i;
      setIsWebView(mwebviewRegex.test(userAgent));
    }
  }, []);
  const router = useRouter();
  const pathName = getCookie();

  const ImageProps = {
    src: "/images/svg/icon_X.svg",
    alt: "NEXT ROOM",
    width: 28,
    height: 28,
  };
  const useSignUpState = useSignUpValue();

  if (isWebView) {
    return (
      <>
        <div className="signup-wrapper" />
        {children}
      </>
    );
  }
  return (
    <>
      <div className="signup-wrapper">
        <button
          className="signup-header"
          onClick={() => {
            if (useSignUpState.level === 5) {
              router.push("/login");
              return;
            }
            if (useSignUpState.level === 1) {
              router.push(pathName);
            }
            router.back();
          }}
        >
          <Image {...ImageProps} />
        </button>
      </div>
      {children}
    </>
  );
}
