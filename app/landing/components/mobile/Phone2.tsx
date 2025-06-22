import { forwardRef, useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import Image from "next/image";
import "@/(shared)/utils/firebase";

import useAnalytics from "../../../(shared)/hooks/useAnalytics";

const Phone2 = forwardRef<HTMLDivElement>((_, ref) => {
  const { logEvent } = useAnalytics();
  logEvent("screen_view", {
    firebase_screen: "homepage_function_2",
    firebase_screen_class: "homepage_function_2",
  });
  const imgProps = {
    src: "/images/landing/hint_phone2.svg",
    alt: "NEXT ROOM",
    width: 180,
    height: 350,
  };

  const controls = useAnimation();
  useEffect(() => {
    const updateOpacity = () => {
      if (typeof ref !== "function" && ref?.current) {
        const viewportHeight = window.innerHeight;

        const start = ref.current.offsetTop + viewportHeight * 0.7;
        const end = ref.current.offsetTop + viewportHeight * 1.4;

        const { scrollY } = window;

        if (scrollY > start && scrollY < end) {
          const progress = (scrollY - start) / (end - start);
          const opacity = 1 - progress;
          controls.start({ opacity: Math.max(0, opacity) });
        } else if (scrollY <= start) {
          controls.start({ opacity: 1 });
        } else if (scrollY >= end) {
          controls.start({ opacity: 0 });
        }
      }
    };

    window.addEventListener("scroll", updateOpacity);
    updateOpacity();
    return () => {
      window.removeEventListener("scroll", updateOpacity);
    };
  }, [controls, ref]);

  const phoneVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 },
  };

  return (
    <motion.div
      className="mobile-img-cont"
      ref={ref}
      variants={phoneVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <Image {...imgProps} />
      <div className="mobile-func-description">
        어두운 공간에서 진행하더라도
        <br />
        밝은 빛으로 인한 방해가 없어요.
      </div>
    </motion.div>
  );
});

export default Phone2;
