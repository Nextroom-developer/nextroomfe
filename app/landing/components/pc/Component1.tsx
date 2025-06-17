import { forwardRef, useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import "@/(shared)/utils/firebase";
import useAnalytics from "../../../(shared)/hooks/useAnalytics";

const Component1 = forwardRef<HTMLDivElement>((_, ref) => {
  const { logEvent } = useAnalytics();
  logEvent("screen_view", {
    firebase_screen: "homepage_top",
    firebase_screen_class: "homepage_top",
  });

  const controls = useAnimation();
  const [inViewRef, inView] = useInView();

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
    <div ref={ref}>
      <motion.div
        className="pc-wrapper1"
        ref={inViewRef}
        variants={boxVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="pc-title-box1">
          <p className="pc-sub-title1">
            방탈출 운영이 편리해지고 테마 만족도가 올라가는
          </p>
          <h1 className="pc-title1">힌트폰 서비스 넥스트룸</h1>
        </div>

        <div className="pc-video-box1">
          <video
            width={"100%"}
            height={"auto"}
            controls
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/0507_홍보영상.MP4" type="video/mp4" />
          </video>
        </div>
      </motion.div>
    </div>
  );
});

export default Component1;
