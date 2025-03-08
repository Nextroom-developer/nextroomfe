import React from "react";
import Image from "next/image";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Component3() {
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

  const imgProps = {
    src: "/images/landing/landing.png",
    alt: "NEXT ROOM",
    width: 786,
    height: 500,
  };
  return (
    <motion.div
      className="pc-main3"
      ref={ref}
      variants={boxVariants}
      initial="hidden"
      animate={controls}
    >
      <p className="pc-sub-title3">
        쉽고 빠르게 <br />
        힌트를 등록하고 수정하세요.
      </p>
      <Image {...imgProps} />
    </motion.div>
  );
}
