import { useAnimation, motion } from "framer-motion";
import { forwardRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Component9 = forwardRef<HTMLDivElement>((_, divref) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  const next = () => setIndex((prev) => (prev + 1) % reviews.length);

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

  const reviews = [
    {
      idx: 1,
      title: "“여러 기기에서 바로 연동되니 훨씬 효율적이에요”",
      content:
        "기존에는 기기마다 따로 세팅해야 했는데, 넥스트룸은 서버에 한 번만 등록하면 전 기기에서 바로 사용 가능하니까 운영이 정말 간편해졌어요.",
      writer: "– 서현 에***** 매니저님",
    },
    {
      idx: 2,
      title: `“힌트 입력 과정이 너무 쉬워서 한 줄기 빛 같았어요”`,
      content:
        "아무것도 모르는 상태에서도 설명서만 보고 바로 따라 할 수 있을 정도로 쉽고 편했어요. 처음 시스템을 도입하는 입장에서 정말 큰 도움이 됐습니다.",
      writer: "– 홍대 *두 사장님",
    },
    {
      idx: 3,
      title: "“무료라서 시작했는데, 계속 쓰게 됐어요”",
      content:
        "처음엔 솔직히 비용 부담이 없다는 점에서 눈길이 갔어요. 막상 써보니 기능도 좋아서 계속 사용하게 되더라고요.",
      writer: "– 신사 시그***** 사장님",
    },
  ];

  return (
    <motion.div ref={divref}>
      <motion.div
        className="pc-wrapper4"
        ref={ref}
        variants={boxVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="pc-main4">
          <div className="pc-review-box">
            <div className="pc-review-slider-window">
              <motion.div
                className="pc-review-track"
                animate={{ x: `-${index * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {reviews.map((review, i) => (
                  <div className="pc-review-slide" key={i}>
                    <p className="pc-review-title">{review.title}</p>
                    <p className="pc-review-content">{review.content}</p>
                    <p className="pc-review-writer">{review.writer}</p>
                  </div>
                ))}
              </motion.div>
            </div>
            <button className="arrow-left" onClick={prev}>
              ‹
            </button>
            <div className="dots">
              {reviews.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === index ? "active" : ""}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
            <button className="arrow-right" onClick={next}>
              ›
            </button>
          </div>
          <div className="pc-title4">
            사장님들의 리얼 후기,
            <br />
            직접 확인해보세요.
          </div>
        </div>
        <div className="pc-review-wrapper">
          <div className="pc-review-logos">
            <img
              src="/images/landing/storeLogos/episode.png"
              alt="episode_logo"
            />
            <img
              src="/images/landing/storeLogos/doopdoo.png"
              alt="doopdoo_logo"
            />
            <img
              src="/images/landing/storeLogos/signalhunter.png"
              alt="signalhunter_logo"
            />
            <img src="/images/landing/storeLogos/doom.png" alt="doom_logo" />
            <img
              src="/images/landing/storeLogos/episode.png"
              alt="episode_logo"
            />
            <img
              src="/images/landing/storeLogos/doopdoo.png"
              alt="doopdoo_logo"
            />
            <img
              src="/images/landing/storeLogos/signalhunter.png"
              alt="signalhunter_logo"
            />
            <img src="/images/landing/storeLogos/doom.png" alt="doom_logo" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});
export default Component9;
