import React, { forwardRef, useRef } from "react";

import useClickOutside from "@/(shared)/hooks/useClickOutside";
import useModal from "@/(shared)/hooks/useModal";
import { setLocalStorage } from "@/(shared)/utils/storageUtil";
import { timerImageLinkURL } from "@/admin/(consts)/sidebar";

import ModalPortal from "../ModalPortal";

import DialogBody from "./DialogBody";

import "../dialog.sass";

interface DialogProps {
  type?: string | "";
}

const Dialog = forwardRef<HTMLFormElement, DialogProps>((props) => {
  const { close } = useModal();
  const checkboxRef = useRef<HTMLInputElement>(null);
  const { type = "" } = props;
  const formRef = useRef<HTMLFormElement | null>(null);
  const handleViewDetailBtn = () => {
    window.open(timerImageLinkURL, "_blank", "noopener, noreferrer");
  };
  const handleCloseBtn = () => {
    if (checkboxRef.current?.checked) {
      setLocalStorage("hideDialog", "true");
    }
    close();
  };

  useClickOutside(formRef, close);

  return (
    <ModalPortal>
      <form
        className={`new-feature-modal ${type}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="new-feature-modal__header noti">
          <h2>새로운 기능을 소개합니다✨</h2>
        </div>
        <DialogBody />
        <div className="new-feature-modal__footer">
          <div className="dont-show-again">
            <input type="checkbox" name="" id="hideDialog" ref={checkboxRef} />
            <label htmlFor="hideDialog">다시 보지 않기</label>
          </div>
          <div className="action-buttons">
            <button
              className="secondary_button40"
              type="button"
              onClick={handleViewDetailBtn}
            >
              자세히 보기
            </button>
            <button className="button40" type="button" onClick={handleCloseBtn}>
              확인
            </button>
          </div>
        </div>
      </form>
    </ModalPortal>
  );
});

export default Dialog;
