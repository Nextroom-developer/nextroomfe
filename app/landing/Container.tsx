"use client";

import "./styles/landing.modules.sass";
import "./styles/mobile.modules.sass";
import "./styles/pc.modules.sass";

import Component1 from "./components/pc/Component1";
import Component2 from "./components/pc/Component2";
import Component3 from "./components/pc/Component3";
import Component4 from "./components/pc/Component4";
import Component5 from "./components/pc/Component5";
import Component6 from "./components/pc/Component6";
import Component7 from "./components/pc/Component7";
import Component9 from "./components/pc/Component9";
import Component1Mobile from "./components/mobile/Component1Mobile";
import Component2Mobile from "./components/mobile/Component2Mobile";
import Component3Mobile from "./components/mobile/Component3Mobile";
import Component4Mobile from "./components/mobile/Component4Mobile";
import Component5Mobile from "./components/mobile/Component5Mobile";
import Component6Mobile from "./components/mobile/Component6Mobile";
import Component7Mobile from "./components/mobile/Component7Mobile";
import Component9Mobile from "./components/mobile/Component9Mobile";
import MobileBtn from "./components/mobile/MobileBtn";
import PcBtn from "./components/pc/PcBtn";
import useScreen from "./hooks/useScreen";
import useAuth from "./hooks/useAuth";

function LandingPage() {
  const { LoginLinkProps, SignUpLinkProps } = useAuth();
  const {
    isMobile,
    isLoading,
    showBtn,
    component1Ref,
    component7Ref,
    component9Ref,
  } = useScreen();

  return (
    <div>
      {isLoading && (
        <>
          <div className="container-wrapper">
            <div className="logo-wrapper">
              <div className="logo" />
              {!isMobile && (
                <div>
                  <button className="login-btn" {...LoginLinkProps}>
                    {LoginLinkProps.title}
                  </button>
                  <button className="free-btn" {...SignUpLinkProps}>
                    {SignUpLinkProps.title}
                  </button>
                </div>
              )}
            </div>
            {/* 조건부 렌더링을 통해 Btn 컴포넌트를 표시 */}
            {/* buttonProps를 전달하고 ref를 설정하여 DOM 요소를 참조합니다. */}
            {isMobile ? (
              <div className="mobile-wrapper">
                <Component1Mobile ref={component1Ref} />
                <Component2Mobile />
                <Component3Mobile />
                <Component4Mobile />
                <Component5Mobile />
                <Component6Mobile />
                <Component7Mobile ref={component7Ref} />

                {/* <Component8Mobile /> */}
                <Component9Mobile ref={component9Ref} />
                {showBtn && <MobileBtn />}
              </div>
            ) : (
              <>
                <Component1 ref={component1Ref} />
                <Component2 />
                <Component3 />
                <Component4 />
                <Component5 />
                <Component6 />
                <Component7 ref={component7Ref} />
                {/* <Component8 /> */}
                <Component9 ref={component9Ref} />
                {showBtn && <PcBtn />}
              </>
            )}
            {/* <Button {...buttonProps}>지금 바로 시작하기</Button> */}
          </div>
          <footer className="footer"> Copyright © 2023 Next room</footer>
        </>
      )}
    </div>
  );
}

export default LandingPage;
