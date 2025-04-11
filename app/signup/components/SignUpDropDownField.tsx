"use client";
import { useEffect, useRef, useState } from "react";

import "../styles/textfield.modules.sass";
import useClickOutside from "@/(shared)/hooks/useClickOutside";

import { TextFieldPropsType } from "../types/SignUp";

export const SignUpDropDownField = (props: TextFieldPropsType) => {
  const {
    id,
    error,
    label,
    type,
    inputProps,
    helperText,
    // placeholder,
    disabled,
    value,
    className,
  } = props;
  const inputRef = useRef<HTMLLabelElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const options = [
    "네이버 검색",
    "구글 검색",
    "네이버 카페(오프라인 방탈출)",
    "지인 추천",
    "홍보물",
    "기타",
  ];

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    }, 1000);
  }, []);

  useClickOutside(divRef, () => {
    setIsFocused(false);
  });
  return (
    <div className={className}>
      <div className="dropdown">
        <button
          className="dropdown-btn"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selected}
          <span className="dropdown-arrow">▾</span>
        </button>
        {isOpen && (
          <ul className="dropdown-optionList">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className="dropdown-option"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
