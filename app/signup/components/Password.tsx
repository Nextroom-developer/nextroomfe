import { NEXT } from "../consts/signUp";
import usePassword from "../hooks/usePassword";

import { SignUpTextField } from "./SignUpTextField";

const PasswordComponent = () => {
  const { formProps, passwordProps, passwordConfirmProps, isValid } =
    usePassword();

  return (
    <div className="signup-cont">
      <p className="signup-title">비밀번호를 입력해 주세요.</p>
      <p className="signup-sub-title">
        대문자, 소문자, 숫자, 기호를 조합하여 8자리 이상의 안전한 비밀번호를
        만드세요
      </p>
      <form {...formProps}>
        <div className="signup-grid">
          <SignUpTextField {...passwordProps} />
        </div>
        <div className="signup-grid">
          <SignUpTextField {...passwordConfirmProps} />
        </div>
        <button className="signup-btn" type="submit" disabled={!isValid}>
          {NEXT}
        </button>
      </form>
    </div>
  );
};

export default PasswordComponent;
