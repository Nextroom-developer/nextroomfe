"use client";

import "./styles/landing.modules.sass";
import "./styles/mobile.modules.sass";

import Link from "next/link";

import useAuth from "../(shared)/auth/hooks/useAuth";

import Component1 from "./components/pc/Component1";
import Component2 from "./components/pc/Component2";
import Component3 from "./components/pc/Component3";
import Component4 from "./components/pc/Component4";
import Component5 from "./components/pc/Component5";
import Component6 from "./components/pc/Component6";
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
import FooterComponent from "./components/Footer";

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
              <div className="logo-nav-wrapper">
                <div className="logo" />
                <div className="logo-nav">
                  <div className="logo-nav-item">
                    <Link
                      href="https://sponge-wood-68d.notion.site/107febdc0ad180f09f68fc47e1f4fde2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      넥스트룸 소개
                    </Link>
                  </div>
                  <div className="logo-nav-item">
                    <Link
                      href="https://held-notebook-420.notion.site/134ed57b9c574733b31feab0ea5c36a5"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      사용 가이드
                    </Link>
                  </div>
                  <div className="logo-nav-item">
                    <Link
                      href="https://sponge-wood-68d.notion.site/1d3febdc0ad180b0ab56c23b527563f8"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      공지사항
                    </Link>
                  </div>
                  <div
                    className="logo-nav-item"
                    onClick={() =>
                      component7Ref.current?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    자주 묻는 질문
                  </div>
                </div>
              </div>
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
                <Component4 ref={component9Ref} />
                <Component5 />
                <Component6 ref={component7Ref} />
                {/* <Component7 ref={component7Ref} /> */}
                {/* <Component8 /> */}
                {/* <Component9 /> */}
                {showBtn && <PcBtn />}
                {/* <Button {...buttonProps}>지금 바로 시작하기</Button> */}
              </>
            )}
          </div>
          <FooterComponent />
        </>
      )}
    </div>
  );
}

export default LandingPage;
