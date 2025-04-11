"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { END } from "@/signup/consts/signUp";

import Loader from "../../(shared)/components/Loader/Loader";
import useSignUpWithGoogle from "../hooks/useSignUpWithGoogle";
import { useGetGoogleCallbackData } from "../apis/getGoogleCallback";

import { SignUpTextField } from "./SignUpTextField";

const SignUpWithGoogleComponent = ({ query }: { query: string }) => {
  const router = useRouter();

  const decodedCode = decodeURIComponent(query.split("&")[0].slice(6));
  if (decodedCode === "=access_denied") {
    router.push("/login");
  }

  const { data: callbackData, isLoading } =
    useGetGoogleCallbackData(decodedCode);

  const [isRedirecting, setIsRedirecting] = useState(false);
  useEffect(() => {
    if (callbackData?.isComplete === true) {
      setIsRedirecting(true);
      setTimeout(() => {
        router.push("/admin");
      }, 0);
    }
  }, [callbackData?.isComplete, router]);

  const {
    formProps,
    storeNameProps,
    pathProps,
    reasonProps,
    totalCheckboxProps,
    requireCheckboxProps,
    adsCheckboxProps,
    isLoadingPut,
    errorMessage,
    disabled,
  } = useSignUpWithGoogle();

  if (isLoading || isLoadingPut || isRedirecting) {
    return <Loader />;
  }

  return (
    <div className="signup-cont">
      <p className="signup-title">
        방탈출 힌트폰 서비스 <br />
        넥스트룸 추가 정보 입력
      </p>
      <form {...formProps}>
        <SignUpTextField {...storeNameProps} />
        {/* <SignUpDropDownField /> */}
        <SignUpTextField {...pathProps} />
        <SignUpTextField {...reasonProps} />

        <label
          className="signup-check-box-label"
          aria-label={"모두 동의합니다."}
        >
          <input
            type="checkbox"
            className="signup-check-box-input-total"
            {...totalCheckboxProps}
          />
          <span>모두 동의합니다.</span>
        </label>
        <label
          className="signup-check-box-label"
          aria-label={"서비스 이용약관"}
        >
          <input
            type="checkbox"
            className="signup-check-box-input-require"
            {...requireCheckboxProps}
          />
          <span>
            <Link
              href="https://held-notebook-420.notion.site/d7bea4318d754b61999e9cb6179a2f70?pvs=4"
              target="_blank"
            >
              서비스 이용약관
            </Link>{" "}
            동의 <span style={{ color: "red" }}>(필수)</span>
          </span>
        </label>
        <label
          className="signup-check-box-label"
          aria-label={"새로운 업데이트 소식 받기"}
        >
          <input
            type="checkbox"
            className="signup-check-box-input-optional"
            {...adsCheckboxProps}
          />
          <span>새로운 업데이트 소식 받기</span>
        </label>

        <button className="signup-btn" type="submit" disabled={disabled}>
          {END}
        </button>
        <div className="signup-server-error-message">{errorMessage}</div>
      </form>
    </div>
  );
};

export default SignUpWithGoogleComponent;
