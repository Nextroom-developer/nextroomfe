import { FunctionComponent, useRef } from "react";
import Image from "next/image";

import "../dialog.sass";
import useClickOutside from "@/(shared)/hooks/useClickOutside";
import { xProps } from "@/admin/(consts)/sidebar";
import useModal from "@/(shared)/hooks/useModal";
import { useDeleteTimerImage } from "@/(shared)/mutations/deleteTimerImage";
import { useSelectedTheme } from "@/(shared)/atoms/selectedTheme.atom";

import ModalPortal from "../ModalPortal";

import DialogBody from "./DialogBody";

const DeleteDialog: FunctionComponent<HTMLFormElement> = () => {
  const { close } = useModal();
  const divRef = useRef<HTMLDivElement | null>(null);
  const [selectedTheme, setSelectedTheme] = useSelectedTheme();

  const { mutateAsync: deleteTimerImage } = useDeleteTimerImage();

  const handleSubmit = async () => {
    const { id } = selectedTheme;
    await deleteTimerImage(id);
    setSelectedTheme((prev) => ({
      ...prev,
      useTimerUrl: false,
      themeImageUrl: "",
    }));

    return close();
  };

  useClickOutside(divRef, close);

  return (
    <ModalPortal>
      <div className={`theme-info-modal`} ref={divRef}>
        <div className="theme-info-modal__header">
          <h2>정말로 삭제하시겠어요?</h2>
          <button className="close-button" type="button" onClick={close}>
            <Image {...xProps} />
          </button>
        </div>
        <DialogBody />
        <div className="theme-info-modal__footer">
          <div className="action-buttons">
            <button className="outlined_button40" type="button" onClick={close}>
              취소
            </button>
            <button className="button40" type="submit" onClick={handleSubmit}>
              삭제하기
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default DeleteDialog;
