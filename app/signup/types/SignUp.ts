import { UseFormRegisterReturn } from "react-hook-form";

export interface SignUpValueType {
  email: string;
}

export interface EmailAuthValueType {
  code: string;
}

export interface PasswordValueType {
  password: string;
  passwordConfirm: string;
}

export interface StoreInfoValueType {
  name: string;
  isNotOpened: boolean;
  reason: string;
  type: number;
}

export interface CodeInputPropsType {
  disabled: boolean;
  numbers: string[];
  setNumbers: (newNumbers: string[]) => void;
}

export type TextFieldPropsType = {
  id: string;
  type: string;
  helperText: string | undefined;
  error: boolean;
  disabled?: boolean;
  variant: string;
  label: string;
  value: string;
  placeholder: string;
  inputProps: UseFormRegisterReturn;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};
