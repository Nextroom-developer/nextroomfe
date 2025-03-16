import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import "@/(shared)/utils/firebase";
import { useInView } from "react-intersection-observer";

import useAnalytics from "../../../(shared)/hooks/useAnalytics";

export default function Component8() {
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
  // const router = useRouter();

  const navigateToTrial = () => {
    // router.push("/trial");
    window.open("/trial", "_blank");
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
    <motion.div
      className="pc-wrapper8"
      ref={ref}
      variants={boxVariants}
      initial="hidden"
      animate={controls}
    >
      <span className="pc-span">
        방탈출 1인 가격보다, 최저 시급보다 저렴한 가격
      </span>
      <div className="pc-title8">보다 합리적으로 선택할 수 있는 요금제</div>
      <div className="pc-box-wrapper8">
        {arr.map(({ name, count, exCost, nowCost }) => (
          <div className="pc-box8" key={name}>
            <span className="pc-box-title">{name}</span>
            <span className="pc-box-description">
              {count}개의 테마를 <br />
              등록할 수 있어요
            </span>
            <span className="pc-box-ex-cost">{exCost}원</span> <br />
            <span className="pc-box-now-cost">
              {nowCost}원<span>/월</span>
            </span>{" "}
            <br /> <br />
            <button className="pc-box-btn" onClick={navigateToTrial}>
              구독하기
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
