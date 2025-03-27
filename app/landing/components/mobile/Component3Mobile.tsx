import Image from "next/image";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function Component3Mobile() {
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
        ease: "easeOut",
      },
    },
  };

  const imgProps = {
    src: "/images/landing/landing.png",
    alt: "NEXT ROOM",
    width: 360,
    height: 228,
  };
  return (
    <motion.div
      className="main3"
      ref={ref}
      variants={boxVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="sub-title3">
        쉽고 빠르게 <br />
        힌트를 등록하고 수정하세요.
      </div>
      <Image {...imgProps} />
    </motion.div>
  );
}
