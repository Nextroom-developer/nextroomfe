import { useAnimation, motion } from "framer-motion";
import Link from "next/link";
import { forwardRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Component6 = forwardRef<HTMLDivElement>((_, divref) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const boxVariants = {
    hidden: {
      y: 100, // 시작 위치를 아래로 조정합니다.
      opacity: 0,
    },
    visible: {
      y: 0, // 최종 위치를 원래 위치로 설정합니다.
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div ref={divref}>
      <motion.div
        className="pc-wrapper6"
        ref={ref}
        variants={boxVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="pc-sub-title3">FAQ</div>
        <div className="pc-faq-wrapper">
          <div
            className={`pc-faq-item ${openIndex === 0 ? "open" : ""}`}
            onClick={() => toggle(0)}
          >
            <div className="pc-faq-title">
              <div className="pc-faq-title-text">
                넥스트룸은 무료 서비스인가요?
              </div>
              <span className="arrow" />
            </div>
            <div className="faq-answer">
              누구나 힌트폰의 기본 기능을 무료로 사용할 수 있습니다.
              <br />
              다만 일부 기능은 유료로 제공하고 있어요.
              <br />
              현재 얼리버드 이벤트 기간으로, 49% 할인된 가격으로 제공하고
              있습니다.
              <br />
              지금 구독하신 분들은 평생 동결 가격으로 넥스트룸을 사용하실 수
              있어요!
            </div>
          </div>
          <div
            className={`pc-faq-item ${openIndex === 1 ? "open" : ""}`}
            onClick={() => toggle(1)}
          >
            <div className="pc-faq-title">
              <div className="pc-faq-title-text">
                구독 시 어떤 혜택이 있나요?
              </div>
              <span className="arrow" />
            </div>
            <div className="faq-answer">
              손님들에게 보여줄 힌트에 사진을 첨부해 더 자세한 설명을 제공할 수
              있어요.
              <br />
              타이머 화면의 배경을 테마 분위기에 맞게 커스텀하는 기능도
              제공해요.
              <br />더 자세한 내용은{" "}
              <Link
                href="https://www.notion.so/107febdc0ad180f09f68fc47e1f4fde2?pvs=21"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-white">여기</span>
              </Link>
              에서 확인해 보세요.
            </div>
          </div>
          <div
            className={`pc-faq-item ${openIndex === 2 ? "open" : ""}`}
            onClick={() => toggle(2)}
          >
            <div className="pc-faq-title">
              <div className="pc-faq-title-text">
                타이머 화면에서 게임을 종료하고 새로운 게임을 시작하는 방법이
                궁금해요.
              </div>
              <span className="arrow" />
            </div>
            <div className="faq-answer">
              타이머 화면의 좌측 상단에 희미하게 화살표가 있어요.
              <br />
              화살표를 1초 이상 꾹 누르면 타이머 화면에서 나갈 수 있습니다.
              <br />
              손님들이 실수로 게임을 종료하지 못하도록 설정해둔 소소한 장치에요.
            </div>
          </div>
          <div
            className={`pc-faq-item ${openIndex === 3 ? "open" : ""}`}
            onClick={() => toggle(3)}
          >
            <div className="pc-faq-title">
              <div className="pc-faq-title-text">비밀번호를 잊어버렸어요.</div>
              <span className="arrow" />
            </div>
            <div className="faq-answer">
              현재 넥스트룸은 비밀번호 찾기/변경 기능을 제공하지 않습니다.
              <br />
              대신 간단한 검증을 통해 탈퇴 처리 후 재가입 하실 수 있도록
              도와드리고 있어요.
              <br />
              요청 시 기존의 데이터 그대로 새 계정에 옮겨드립니다.
              <br />
              도움이 필요하시면 공식 계정(nextroom.official@gmail.com)으로 연락
              주세요.
            </div>
          </div>
          <div
            className={`pc-faq-item ${openIndex === 4 ? "open" : ""}`}
            onClick={() => toggle(4)}
          >
            <div className="pc-faq-title">
              <div className="pc-faq-title-text">
                앱 사용중에 문제가 생겼어요.
              </div>
              <span className="arrow" />
            </div>
            <div className="faq-answer">
              일시적으로 발생하는 문제가 아니라면 다음 연락망을 통해 제보해
              주세요.
              <br />
              ■ 공식 계정: nextroom.official@gmail.com
              <br />
              ■ 인스타그램: https://www.instagram.com/team_nextroom/
              <br />
              ■ 연락처: 010-7416-9874
              <br />
              <br />
              <img
                className="pc-faq-img"
                src="/images/landing/error-message.png"
                alt="error-message"
                width={240}
              />
              <br />
              <br />
              에러 팝업의 오류 내용 보기 버튼을 클릭하여 같이 제보해주시면
              <br />
              더욱 빠른 조치가 가능합니다.
            </div>
          </div>
          <div
            className={`pc-faq-item ${openIndex === 5 ? "open" : ""}`}
            onClick={() => toggle(5)}
          >
            <div className="pc-faq-title">
              <div className="pc-faq-title-text">
                힌트 코드에는 숫자밖에 못쓰나요?
              </div>
              <span className="arrow" />
            </div>
            <div className="faq-answer">
              넥스트룸은 숫자만 지원하고 있습니다.
              <br />
              손님들이 힌트 코드를 입력하는 데 시간을 지체하지 않기를 바라는
              마음에 숫자만 지원하고 있어요.
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});
export default Component6;
