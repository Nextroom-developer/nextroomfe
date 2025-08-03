"use client";

import Link from "next/link";

import useAuth from "@/(shared)/auth/hooks/useAuth";

function NavbarComponent({
  componentRef,
  isMobile,
}: {
  componentRef: React.RefObject<HTMLDivElement>;
  isMobile: boolean;
}) {
  const { LoginLinkProps, SignUpLinkProps } = useAuth();

  return (
    <header className="header">
      <div className="logo-wrapper">
        <div className="logo-nav-wrapper">
          <div
            className="logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
          <div className="logo-nav">
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
              onClick={() => {
                componentRef.current?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
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
    </header>
  );
}

export default NavbarComponent;
