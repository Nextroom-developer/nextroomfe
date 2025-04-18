import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Component6() {
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
      className="pc-wrapper"
      ref={ref}
      variants={boxVariants}
      initial="hidden"
      animate={controls}
    >
      <span className="pc-span">넥스트룸은</span>
      <p className="pc-title6">
        방탈출에만 몰입할 수 있는
        <br />
        특별한 기능을 제공합니다.
      </p>
      <p className="pc-sub-title6">
        직관적으로 확인할 수 있는 진행률부터 힌트 확인까지, <br />
        최소한의 동작으로 기능을 실행합니다. <br />
        <br />
        테마 몰입에 방해되는 요소는 최소한으로 줄이고 <br />
        편의성을 높은 기능들을 준비했죠.
      </p>
    </motion.div>
  );
}
