"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useCheckSignIn from "@/landing/hooks/useCheckSignIn";
import { getLoginInfo, setSelectedThemeId } from "@/(shared)/utils/storageUtil";
import { useSelectedTheme } from "@/(shared)/atoms/selectedTheme.atom";
import { useToastInfo } from "@/(shared)/atoms/toast.atom";

import { useGetThemeList } from "../(shared)/queries/getThemeList";
import Loader from "../(shared)/components/Loader/Loader";

import AdminView from "./AdminView";

type Theme = {
  id: number;
  title: string;
  timeLimit: number;
  hintLimit: number;
};

function Admin() {
  const { data: categories = [], isLoading } = useGetThemeList();
  const isLoggedIn = useCheckSignIn();

  const [selectedTheme, setSelectedTheme] = useSelectedTheme();

  // const { accessToken } = getLoginInfo();
  // console.log(accessToken);
  const [toast, setToast] = useToastInfo();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && categories.length > 0 && selectedTheme.id === 0) {
      setSelectedTheme(categories[categories.length - 1]);
    }
  }, [isLoading]);

  const handleClickSelected = (theme: Theme) => {
    setSelectedTheme(theme);
    setSelectedThemeId(theme.id);
    setTimeout(() => {
      if (theme.id) {
        router.push(`/admin?themeId=${encodeURIComponent(theme.id)}`);
      }
    }, 10);
  };

  useEffect(() => {
    if (toast.isOpen) {
      setTimeout(() => {
        setToast({ ...toast, isOpen: false });
      }, 3000);
    }
  }, [toast, setToast]);

  const SidebarViewProps = {
    categories,
    selectedTheme,
    handleClickSelected,
    isOpen: toast.isOpen,
    isLoading,
  };

  return <AdminView {...SidebarViewProps} />;
}

export default Admin;
