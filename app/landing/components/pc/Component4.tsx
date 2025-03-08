import React from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Component4() {
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
      className="pc-wrapper4"
      ref={ref}
      variants={boxVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="pc-title4">
        힌트폰을 사용하면
        <br />
        이런 일은 발생하지 않습니다.
      </div>
      <div className="pc-main4">
        <div>
          <p className="pc-sub-title4">
            힌트를 제공 받을 때 고객이 직원의 말투나
            <br />
            태도 때문에 불만족한 경험이 있다.
          </p>
          <p className="pc-score">62%</p>
        </div>
        <div className="bar" />
        <div>
          <p className="pc-sub-title4">
            직원이 잘못된 힌트를 <br />
            알려준 적이 있다.
          </p>
          <p className="pc-score">34%</p>
        </div>
      </div>
    </motion.div>
  );
}
