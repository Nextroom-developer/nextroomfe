import { FormEvent, FunctionComponent, useRef } from "react";
import Image from "next/image";

import "../dialog.sass";
import { useSelectedTheme } from "@/(shared)/atoms/selectedTheme.atom";
import useClickOutside from "@/(shared)/hooks/useClickOutside";
import useModal from "@/(shared)/hooks/useModal";
import useTimerImageUpload from "@/admin/apis/timerImage/postTimerImage";
import { useTimerImageValue } from "@/(shared)/atoms/timerImage.atom";
import { XImageProps } from "@/admin/(components)/ThemeDrawer/consts/themeDrawerProps";

import ModalPortal from "../ModalPortal";

import DialogBody from "./DialogBody";

const Dialog: FunctionComponent<HTMLFormElement> = () => {
  const { close } = useModal();
  const formRef = useRef<HTMLFormElement | null>(null);

  const [selectedTheme, setSelectedTheme] = useSelectedTheme();
  const { timerImage } = useTimerImageValue();
  const { handleProcess } = useTimerImageUpload();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { id } = selectedTheme;

    const submitData = {
      themeId: id,
      timerImageFile: timerImage,
    };
    try {
      const imageUrl = await handleProcess(submitData);
      setSelectedTheme((prev) => ({
        ...prev,
        useTimerUrl: true,
        themeImageUrl: imageUrl,
      }));
    } catch (error) {
      console.error(error);
    }

    close();
  };

  useClickOutside(formRef, close);

  return (
    <ModalPortal>
      <form
        className={`timer-image-modal`}
        ref={formRef}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="timer-image-modal__header">
          <h2>타이머 배경 올리기</h2>
          <button
            className="ghost_white_icon_button28"
            type="button"
            onClick={close}
          >
            <Image {...XImageProps} />
          </button>
        </div>
        <DialogBody />
        <div className="timer-image-modal__footer">
          <p className="timer-preview-image-footer-text">
            힌트폰에 곧바로 적용됩니다
          </p>
          <div className="action-buttons">
            <button className="outlined_button40" type="button" onClick={close}>
              취소
            </button>
            <button className="button40" type="submit">
              등록하기
            </button>
          </div>
        </div>
      </form>
    </ModalPortal>
  );
};

export default Dialog;
