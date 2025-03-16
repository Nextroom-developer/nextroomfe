import React from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "@/(shared)/apis/firebase";

import useAnalytics from "../../hooks/useAnalytics";

export default function Component8Mobile() {
  const { logEvent } = useAnalytics();
  logEvent("screen_view", {
    firebase_screen: "homepage_plan",
    firebase_screen_class: "homepage_plan",
  });
  const arr = [
    { name: "미니", count: 2, exCost: "19,900", nowCost: "9,900" },
    { name: "미디움", count: 5, exCost: "29,900", nowCost: "14,900" },
    { name: "라지", count: 8, exCost: "39,900", nowCost: "19,900" },
  ];
  const controls = useAnimation();
  const [ref, inView] = useInView();

  React.useEffect(() => {
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
      className="wrapper8"
      ref={ref}
      variants={boxVariants}
      initial="hidden"
      animate={controls}
    >
      <span className="span">
        방탈출 1인 가격보다, 최저 시급보다 저렴한 가격
      </span>
      <p className="title8">
        보다 합리적으로 선택할 수 있는
        <br />
        요금제
      </p>
      <div className="box-wrapper8">
        {arr.map(({ name, count, exCost, nowCost }) => (
          <div className="box8" key={name}>
            <span className="box-title">{name}</span>
            <div className="box-cont">
              <span className="box-description">
                {count}개의 테마를 등록할 수 있어요
              </span>
              <span className="box-now-cost">
                {nowCost}원<span>/월</span>
              </span>
            </div>
            <span className="box-ex-cost">{exCost}원</span> <br />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
