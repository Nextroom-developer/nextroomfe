import { useAnimation, motion } from "framer-motion";
import { forwardRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Component4 = forwardRef<HTMLDivElement>((_, divref) => {
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
        "직관적인 UI로 사용이 매우 편리하고, 지속적으로 업그레이드를 해주셔서 너무 좋습니다!",
      writer: "– 홍대 토끼굴 사장님",
    },
    {
      idx: 2,
      title: `“힌트 입력 과정이 너무 쉬워서 한 줄기 빛 같았어요”`,
      content:
        "관리자도, 이용자도 모두 쉽게 사용할 수 있었어요. 최고의 방탈출 힌트폰 앱입니다!",
      writer: "– 홍대 둡두 사장님",
    },
    {
      idx: 3,
      title: "“무료라서 시작했는데, 계속 쓰게 됐어요”",
      content:
        "굉장히 유저프렌들리하고 필요한 기능만 알차게 담겨 있어 운영에 많은 도움이 되었습니다.",
      writer: "– 신사 시그널헌터 사장님",
    },
  ];
  const logos = [
    {
      src: "/images/landing/storeLogos/doopdoo.png",
      alt: "doopdoo_logo",
    },
    {
      src: "/images/landing/storeLogos/signalhunter.png",
      alt: "signalhunter_logo",
    },
    {
      src: "/images/landing/storeLogos/rabbithole.png",
      alt: "doom_logo",
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
        <div className="pc-review-wrapper">
          <div className="pc-review-logos">
            {[...logos, ...logos, ...logos, ...logos].map((logo, idx) => (
              <img key={idx} src={logo.src} alt={logo.alt} />
            ))}
          </div>
          <div className="pc-review-logos-text">
            20+개의 매장에서 넥스트룸 사용 중
          </div>
        </div>
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
      </motion.div>
    </motion.div>
  );
});
export default Component4;
