import { useState, useEffect, FormEvent, useRef } from "react";

import {
  InitialSelectedHint,
  SelectedHintType,
  useSelectedHint,
  useSelectedHintReset,
} from "@/(shared)/atoms/selectedHint.atom";
import { useSelectedThemeValue } from "@/(shared)/atoms/selectedTheme.atom";
import { useCreateHint } from "@/(shared)/atoms/createHint.atom";
import useClickOutside from "@/(shared)/hooks/useClickOutside";
import useModal from "@/(shared)/hooks/useModal";
import extractFilename from "@/admin/(components)/ThemeDrawer/helpers/filenameHelpers";
import { useDrawerState } from "@/(shared)/atoms/drawer.atom";
import { getHintList } from "@/(shared)/queries/getHintList";
import useHintUpload from "@/(shared)/queries/getPreSignedUrl";
import HintDialog from "@/(shared)/components/Dialog-new/Hint-Dialog-new/Dialog";

import { DrawerType } from "../types/themeDrawerTypes";

const useEditHint = ({ hintType, handleHintCreate }: DrawerType) => {
  const { id: themeId } = useSelectedThemeValue();

  const selectedTheme = useSelectedThemeValue();
  const [selectedHint, setSelectedHint] = useSelectedHint();
  const [createHint, setCreateHint] = useCreateHint();

  const [hintImages, setHintImages] = useState<File[]>([]);
  const [answerImages, setAnswerImages] = useState<File[]>([]);

  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const resetSelectedHint = useSelectedHintReset();

  const drawerRef = useRef<HTMLFormElement>(null);

  const [drawer, setDrawer] = useDrawerState();

  useEffect(() => {
    setCreateHint((prev) => ({
      ...prev,
      hintImageUrlList: selectedHint.hintImageUrlList,
      answerImageUrlList: selectedHint.answerImageUrlList,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isImcomplete = !(
    createHint.hintCode &&
    createHint.progress &&
    createHint.contents &&
    createHint.answer
  );

  const onCloseDrawer = () => {
    const element = document.querySelector(".theme-info-modal.delete");
    if (element) {
      setDrawer({ ...drawer, isOpen: true });
    } else {
      setDrawer({ ...drawer, isOpen: false });
      resetSelectedHint();
    }
  };

  const isSameHint =
    String(createHint.hintCode) === String(selectedHint.hintCode) &&
    Number(createHint.progress) === Number(selectedHint.progress) &&
    String(createHint.contents) === String(selectedHint.contents) &&
    String(createHint.answer) === String(selectedHint.answer) &&
    // 서버에 올라간 사진 삭제 여부를 비교
    createHint.hintImageUrlList === selectedHint.hintImageUrlList &&
    createHint.answerImageUrlList === selectedHint.answerImageUrlList &&
    // 로컬 업로드 사진 하나라도 있으면 변경된 것
    Boolean(!hintImages.length) &&
    Boolean(!answerImages.length);

  useEffect(() => {
    setDrawer((prevDrawer) => ({
      ...prevDrawer,
      isSameHint,
    }));
  }, [isSameHint, createHint, selectedHint]);

  useEffect(() => {
    if (drawer.hintType === "Add") {
      return;
    }

    if (isSameHint || isImcomplete) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [
    hintType,
    isSameHint,
    isImcomplete,
    createHint,
    selectedHint,
    hintImages.length,
    answerImages.length,
  ]);

  useEffect(() => {
    if (hintType === "Add") {
      return;
    }
    setCreateHint((prev) => ({
      ...prev,
      contents: selectedHint.contents,
      answer: selectedHint.answer,
    }));
  }, [hintType, selectedHint, setCreateHint]);

  const { handleProcess } = useHintUpload();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      themeId: selectedTheme.id, // 실제 테마 ID
      hintCode: createHint.hintCode,
      contents: createHint.contents,
      answer: createHint.answer,
      progress: createHint.progress,
      id: selectedHint.id,
      hintImageList:
        selectedHint?.hintImageUrlList?.length > 0
          ? selectedHint.hintImageUrlList.map((url) => extractFilename(url))
          : [],
      answerImageList:
        selectedHint?.answerImageUrlList?.length > 0
          ? selectedHint.answerImageUrlList.map((url) => extractFilename(url))
          : [],
    };
    try {
      await handleProcess(formData, hintImages, answerImages);
      setHintImages([]);
      setAnswerImages([]);

      const { data: hints = [] } = await getHintList({ themeId });
      const hintElement: SelectedHintType[] = hints.filter(
        (hint: SelectedHintType) => hint.hintCode === createHint.hintCode
      );
      if (hintElement.length !== 1) {
        throw Error("hintElement is not unique");
      }

      setSelectedHint(() => ({ ...InitialSelectedHint, ...hintElement[0] }));
      setCreateHint((prev) => ({
        ...prev,
        hintImageUrlList: hintElement[0].hintImageUrlList,
        answerImageUrlList: hintElement[0].answerImageUrlList,
      }));
      handleHintCreate("Edit");
    } catch (error) {
      console.error(error);
    }
  };
  const { open } = useModal();
  const handleOpenHintModal = () => {
    if (isSameHint) {
      onCloseDrawer();
    } else {
      open(HintDialog, { type: "put", fn: onCloseDrawer });
    }
  };

  useClickOutside(drawerRef, handleOpenHintModal);

  const deleteHintBtn = () => {
    open(HintDialog, { type: "delete", fn: onCloseDrawer });
  };

  return {
    handleSubmit,
    drawerRef,
    hintImages,
    setHintImages,
    answerImages,
    setAnswerImages,
    isDisabled,
    isImcomplete,
    deleteHintBtn,
    handleOpenHintModal,
  };
};

export default useEditHint;
