import Link from "next/link";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

import { END } from "@/signup/consts/signUp";
import { setLoginInfo } from "@/(shared)/auth/storageUtil";

import Loader from "../../(shared)/components/Loader/Loader";
import useSignUpWithGoogle from "../hooks/useSignUpWithGoogle";
import { useGetGoogleCallbackData } from "../apis/getGoogleCallback";

import { SignUpTextField } from "./SignUpTextField";

const SignUpWithGoogleComponent = ({ query }: { query: string }) => {
  const router = useRouter();
  const decodedCode = decodeURIComponent(query.split("&")[0].slice(6));
  const { data: callbackData, isLoading } =
    useGetGoogleCallbackData(decodedCode);

  useLayoutEffect(() => {
    if (callbackData?.isComplete === true) {
      // console.log(callbackData.isComplete, " isComplete");
      // login처리
      setLoginInfo({
        accessToken: callbackData.accessToken,
        refreshToken: callbackData.refreshToken,
        shopName: callbackData.shopName,
        adminCode: callbackData.adminCode,
        accessTokenExpiresIn: Number(callbackData.accessTokenExpiresIn),
      });
      router.push("/admin");
    } else if (callbackData?.accessToken) {
      localStorage.setItem("accessToken", callbackData.accessToken);
    }
  }, [callbackData]);

  const {
    formProps,
    storeNameProps,
    pathProps,
    reasonProps,
    checkboxProps,
    errorMessage,
  } = useSignUpWithGoogle();

  const { label, checked, onChange, onClick } = checkboxProps;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="signup-cont">
      <p className="signup-title">
        방탈출 힌트폰 서비스 <br />
        넥스트룸 추가 정보 입력
      </p>
      {/* <p className="signup-sub-title">
        <Link
          href="https://held-notebook-420.notion.site/d7bea4318d754b61999e9cb6179a2f70?pvs=4"
          target="_blank"
        />
      </p> */}
      <form {...formProps}>
        <SignUpTextField {...storeNameProps} />
        <SignUpTextField {...pathProps} />
        <SignUpTextField {...reasonProps} />
        <label className="signup-check-box-label" aria-label={label}>
          <input
            type="checkbox"
            className="signup-check-box-input"
            onClick={onClick}
            onChange={onChange}
          />
          {label}
        </label>
        {/* <div className="signup-form-group">
        </div> */}

        <button className="signup-btn" type="submit">
          {END}
        </button>
        <div className="signup-server-error-message">{errorMessage}</div>
      </form>
    </div>
  );
};

export default SignUpWithGoogleComponent;
