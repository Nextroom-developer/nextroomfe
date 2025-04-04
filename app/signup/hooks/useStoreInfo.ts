import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useSignUpState } from "@/(shared)/atoms/signup.atom";
import useAnalytics from "@/(shared)/hooks/useAnalytics";
import { usePostSignUp } from "@/signup/apis/postSignUp";

import { StoreInfoValueType, TextFieldPropsType } from "../types/SignUp";

const useStoreInfo = () => {
  const [signUpState, setSignUpState] = useSignUpState();
  const [isWebView, setIsWebView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { logEvent } = useAnalytics();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { userAgent } = window.navigator;

      const mwebviewRegex = /APP_NEXTROOM_ANDROID/i;
      setIsWebView(mwebviewRegex.test(userAgent));

      const mobileRegex =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i;
      setIsMobile(mobileRegex.test(userAgent));
    }
  }, []);

  const type = isWebView ? 3 : isMobile ? 2 : 1;

  useEffect(() => {
    logEvent("screen_view", {
      firebase_screen: "sign_up_store_info",
      firebase_screen_class: "sign_up_store_info",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    mutateAsync: postSignUp,
    isLoading = false,
    isError = false,
    error,
  } = usePostSignUp();

  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<StoreInfoValueType>({
    defaultValues: {
      name: "",
      reason: "",
    },
  });

  const formValue = watch();

  useEffect(() => {
    setTimeout(() => {
      setFocus("name");
    }, 1000);
  }, [setFocus]);

  useEffect(() => {
    if (isChecked) {
      reset({
        name: "", // name 필드 초기화
      });
    }
    setTimeout(() => {
      setFocus("reason");
    }, 10);
  }, [isChecked, reset, setFocus]);

  const browserPreventEvent = () => {
    history.pushState(null, "", location.href);
    setSignUpState({ ...signUpState, level: 3 });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      history.pushState(null, "", location.href);
      window.addEventListener("popstate", browserPreventEvent);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("popstate", browserPreventEvent);
      }
    };
  }, [browserPreventEvent]);

  const onSubmit: SubmitHandler<StoreInfoValueType> = (data) => {
    postSignUp({
      email: signUpState.email,
      password: signUpState.password,
      name: isChecked ? data.reason : data.name,
      isNotOpened: isChecked,
      type,
    });
    logEvent("btn_click", {
      btn_name: "sign_up_store_info_btn",
      btn_position: "top",
    });
  };

  const formProps = {
    component: "form",
    noValidate: true,
    autoComplete: "off",
    onSubmit: handleSubmit(onSubmit),
  };

  const storeNameProps: TextFieldPropsType = {
    id: "filled-storeName",
    type: "text",
    helperText: errors?.name && errors?.name.message,
    error: Boolean(errors?.name) || isError,
    variant: "filled",
    label: "매장명",
    placeholder: "매장명",
    disabled: isChecked,
    inputProps: { ...register("name") },
    value: formValue.name,
    className: "textfield-store-name",
  };

  const reasonProps: TextFieldPropsType = {
    id: "filled-adminCode",
    type: "text",
    helperText: errors?.name && errors?.name.message,
    error: Boolean(errors?.name) || isError,
    variant: "filled",
    label: "방문사유",
    placeholder: "방문사유",
    inputProps: { ...register("reason") },
    value: formValue.reason,
    className: "textfield-reason",
  };

  const checkBoxProps = {
    label: "매장명이 없습니다.",
    checked: isChecked,
    onChange: () => {
      setIsChecked(!isChecked);
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        window.scrollTo(0, document.body.scrollHeight);
      }
    },
    onClick: () => {
      logEvent("btn_click", {
        btn_name: "shopName_check",
        btn_position: "top",
      });
    },
  };

  const errorMessage = isError && error?.response?.data?.message;

  return {
    formProps,
    storeNameProps,
    checkBoxProps,
    reasonProps,
    disabled: !(
      formValue.name?.length > 0 ||
      (isChecked && formValue.reason?.length > 0)
    ),
    isLoading,
    errorMessage,
  };
};

export default useStoreInfo;
