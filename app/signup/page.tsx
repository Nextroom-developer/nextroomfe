"use client";

import React from "react";
import "./styles/signup.modules.sass";

import { useSignUpValue } from "@/components/atoms/signup.atom";

import SignUpComponent from "./components/SignUp";
import EmailAuthComponent from "./components/EmailAuth";
import PasswordComponent from "./components/Password";
import StoreInfoComponent from "./components/StoreInfo";
import SignUpSuccessComponent from "./components/SignUpSuccess";

function SignUpPage() {
  const useSignUpState = useSignUpValue();
  switch (useSignUpState.level) {
    case 1:
      return <SignUpComponent />;
    case 2:
      return <EmailAuthComponent />;
    case 3:
      return <PasswordComponent />;
    case 4:
      return <StoreInfoComponent />;
    case 5:
      return <SignUpSuccessComponent />;
    default:
      return <SignUpComponent />;
  }
}

export default SignUpPage;
