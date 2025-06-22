"use client";

import Link from "next/link";
import "../styles/footer.modules.sass";

function FooterComponent() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="footer-title">넥스트룸(nextroom)</div>
          <div className="footer-copyright">Copyright © 2023 Next room</div>
          <div className="footer-info">
            대표: 김주환
            <br />
            사업자등록번호: 487-23-01961 | 통신판매번호: 2024-서울강남-05436
            <br />
            <Link
              href="https://held-notebook-420.notion.site/d7bea4318d754b61999e9cb6179a2f70?source=copy_link"
              target="_blank"
            >
              개인정보처리방침
            </Link>{" "}
            | 문의메일: nextroom.official@gmail.com
          </div>
        </div>
        <div className="footer-right">
          <img
            className="footer-qr"
            src="/images/landing/qr-code.png"
            alt="QR"
          />
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
