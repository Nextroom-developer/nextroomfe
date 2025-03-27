import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Component4Mobile() {
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
      className="wrapper4"
      ref={ref}
      variants={boxVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="title4">
        힌트폰을 사용하면
        <br />
        이런 일은 발생하지 않습니다.
      </div>
      <div className="sub-title4">
        힌트를 제공 받을 때 고객이 직원의 말투나
        <br />
        태도 때문에 불만족한 경험이 있다.
        <p className="score">62%</p>
      </div>
      <div className="sub-title4">
        <p>
          직원이 잘못된 힌트를 <br />
          알려준 적이 있다.
        </p>
        <p className="score">34%</p>
      </div>
    </motion.div>
  );
}
