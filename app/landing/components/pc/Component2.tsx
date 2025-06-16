import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "@/(shared)/utils/firebase";

import useAnalytics from "../../../(shared)/hooks/useAnalytics";

export default function Component2() {
  const { logEvent } = useAnalytics();
  logEvent("screen_view", {
    firebase_screen: "homepage_carrer",
    firebase_screen_class: "homepage_carrer",
  });

  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const boxVariants = {
    hidden: {
      y: 50, // 시작 위치를 아래로 조정합니다.
      opacity: 0,
    },
    visible: {
      y: 0, // 최종 위치를 원래 위치로 설정합니다.
      opacity: 1,
      transition: {
        duration: 0.5,
        // "easeOut"은 애니메이션 끝 부분에서 조금 느려지는 효과를 줍니다.
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="pc-wrapper"
      ref={ref}
      variants={boxVariants}
      initial="hidden"
      animate={controls}
    >
      <h1 className="pc-title2">
        4년간의 현장 경험으로 탄생한 솔루션 <br />
        운영 실수를 줄이고 손님의 만족도를 높입니다.
      </h1>
      <h4 className="pc-sub-title2">
        방탈출에만 몰입할 수 있는 특별한 기능을 제공합니다.
      </h4>
      <motion.div
        className="pc-wrapper2"
        variants={boxVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="pc-func-box2">
          <p className="pc-func-title2">
            테마에 몰입되도록
            <br />
            편의성 높은 기능
          </p>
          <div className="pc-func-img-box1">
            <img
              className="pc-func-img"
              src="/images/landing/hint_phone2.png"
              alt="hint_phone2"
            />
          </div>
          <div className="pc-func-img-box2">
            <img
              className="pc-func-img"
              src="/images/landing/hint_phone.png"
              alt="hint_phone1"
            />
          </div>
          <h4 className="pc-func-text2">
            힌트폰 사용 중 밝은 빛으로 인한 방해가 없어요.
            <br />
            플레이 중 남은 시간은 {` `}
            <br />
            어느 화면에서도 직관적으로 확인할 수 있어요.
          </h4>
        </div>
        <div className="pc-func-box3">
          <p className="pc-func-title2">
            테마에 딱 맞게,
            <br />
            배경화면도 커스터마이징
          </p>
          <div className="pc-func-img-box1">
            <img
              className="pc-func-img"
              src="/images/landing/hint_phone2.png"
              alt="hint_phone2"
            />
          </div>
          <h4 className="pc-func-text3">
            매장의 개성을 살리는
            <br />
            각 테마의 독특한 분위기로
            <br />
            배경화면을 커스텀해보세요.
          </h4>
        </div>
      </motion.div>
    </motion.div>
  );
}
