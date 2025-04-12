"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import useAnalytics from "@/(shared)/hooks/useAnalytics";
import { getLoginInfo, setLoginInfo } from "@/(shared)/auth/storageUtil";

import {
  DropDownPropsType,
  StoreInfoValueType,
  TextFieldPropsType,
} from "../types/SignUp";
import { usePutSignUpWithGoogle } from "../apis/putSignUpWithGoogle";

const useSignUpWithGoogle = () => {
  const [isWebView, setIsWebView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [totalChecked, setTotalChecked] = useState(false);
  const [requireChecked, setRequireChecked] = useState(false);
  const [adsChecked, setAdsChecked] = useState(false);

  const [pathText, setPathText] = useState("");
  const [reasonText, setReasonText] = useState("");

  const [isRedirecting, setIsRedirecting] = useState(false);

  const loginInfo = getLoginInfo();
  const { logEvent } = useAnalytics();
  const router = useRouter();

  useEffect(() => {
    if (requireChecked && adsChecked) {
      setTotalChecked(true);
    } else if (!requireChecked && !adsChecked) {
      setTotalChecked(false);
    } else {
      setTotalChecked(false);
    }
  }, [totalChecked, requireChecked, adsChecked]);

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
    mutateAsync: postSignUpWithGoogle,
    isLoading: isLoadingPut,
    isError = false,
    error,
  } = usePutSignUpWithGoogle();

  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors },
  } = useForm<StoreInfoValueType>({
    defaultValues: {
      name: "",
      path: "",
      reason: "",
    },
  });

  const formValue = watch();
  useEffect(() => {
    setTimeout(() => {
      setFocus("reason");
    }, 1000);
  }, [setFocus]);

  useEffect(() => {
    setTimeout(() => {
      setFocus("path");
    }, 1000);
  }, [setFocus]);

  useEffect(() => {
    setTimeout(() => {
      setFocus("name");
    }, 1000);
  }, [setFocus]);

  const onSubmit: SubmitHandler<StoreInfoValueType> = async (data) => {
    setIsRedirecting(true);
    await postSignUpWithGoogle({
      name: data.name,
      signupSource: data.path || pathText,
      comment: data.reason || reasonText,
      adsConsent: adsChecked,
      type,
    });
    setLoginInfo({
      ...loginInfo,
      shopName: data.name,
    });

    router.push("/signup/success");

    logEvent("btn_click", {
      btn_name: "sign_up_store_with_google_info_btn",
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
    label: "매장명 ",
    placeholder: "매장명을 입력해주세요.",
    inputProps: { ...register("name") },
    value: formValue.name,
    className: "textfield-store-name google",
    require: true,
  };

  const pathDropDownProps: DropDownPropsType = {
    label: "가입 경로 ",
    selectedText: "선택해 주세요.",
    options: [
      "네이버 검색",
      "구글 검색",
      "네이버 카페(오프라인 방탈출)",
      "지인 추천",
      "홍보물",
      "기타",
    ],
    value: pathText,
    setValue: setPathText,
    require: true,
  };

  const pathProps: TextFieldPropsType = {
    id: "filled-path",
    type: "text",
    helperText: errors?.name && errors?.name.message,
    error: Boolean(errors?.name) || isError,
    variant: "filled",
    label: "가입 경로",
    placeholder: "(필수) 기타 가입 경로를 입력해주세요.",
    inputProps: { ...register("path") },
    value: formValue.path,
    className: "textfield-store-path dropdown-textfield",
  };

  const reasonDropDownProps: DropDownPropsType = {
    label: "가입 이유",
    selectedText: "선택해 주세요.",
    options: [
      "운영 중인 매장에 도입하기 위해",
      "오픈 예정인 매장에 도입하기 위해",
      "학교 혹은 공공기관에서 이벤트성으로 사용",
      "기타",
    ],
    value: reasonText,
    setValue: setReasonText,
    require: false,
  };

  const reasonProps: TextFieldPropsType = {
    id: "filled-reason",
    type: "text",
    helperText: errors?.name && errors?.name.message,
    error: Boolean(errors?.name) || isError,
    variant: "filled",
    label: "가입 이유",
    placeholder: "(선택) 기타 가입 이유를 입력해주세요.",
    inputProps: { ...register("reason") },
    value: formValue.reason,
    className: "textfield-reason dropdown-textfield",
  };

  const totalCheckboxProps = {
    checked: totalChecked,
    onChange: () => {
      setTotalChecked(!totalChecked);
    },
    onClick: () => {
      if (totalChecked === false) {
        setRequireChecked(true);
        setAdsChecked(true);
      } else {
        setRequireChecked(false);
        setAdsChecked(false);
      }
    },
  };

  const requireCheckboxProps = {
    checked: requireChecked,
    onChange: () => {
      setRequireChecked(!requireChecked);
    },
  };

  const adsCheckboxProps = {
    checked: adsChecked,
    onChange: () => {
      setAdsChecked(!adsChecked);
    },
  };

  const errorMessage = isError && error?.response?.data?.message;
  const disabled =
    !formValue.name || (!pathText && !formValue.path) || !requireChecked;

  return {
    formProps,
    storeNameProps,
    pathDropDownProps,
    pathProps,
    reasonDropDownProps,
    reasonProps,
    totalCheckboxProps,
    requireCheckboxProps,
    adsCheckboxProps,
    isLoadingPut,
    errorMessage,
    disabled,
    isRedirectingPut: isRedirecting,
  };
};

export default useSignUpWithGoogle;
