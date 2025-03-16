"use client";

import Link from "next/link";
import Image from "next/image";

import { SignUpTextField } from "@/signup/components/SignUpTextField";

import Loader from "../../(shared)/components/Loader/Loader";
import useLogIn from "../hooks/useLogIn";
import { LOGIN, logoImageProps } from "../consts/logIn";

const LogInComponent = () => {
  const {
    formProps,
    emailProps,
    passwordProps,
    isLoading,
    errorMessage,
    handleClickSignUpBtn,
  } = useLogIn();

  return (
    <div className="login-wrapper">
      {isLoading && <Loader />}
      <Link href="/">
        <Image {...logoImageProps} />
      </Link>

      <div className="login-styled-box" {...formProps}>
        <SignUpTextField {...emailProps} />
        <SignUpTextField {...passwordProps} />
        <div className="login-btn-wrapper">
          <div className="login-server-error-message">{errorMessage}</div>
          <button className="login-btn" type="submit">
            {LOGIN}
          </button>
        </div>
        <div className="login-signup-box">
          관리자 계정이 필요하신가요?
          <button type="button" onClick={handleClickSignUpBtn}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogInComponent;
