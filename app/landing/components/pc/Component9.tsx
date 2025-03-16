import { forwardRef, useEffect } from "react";
import Image from "next/image";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";

import { setCookie } from "@/(shared)/utils/cookie";

import useCheckSignIn from "../../hooks/useCheckSignIn";
import "@/(shared)/apis/firebase";
import useAnalytics from "../../hooks/useAnalytics";

const Component9 = forwardRef<HTMLDivElement>((_, ref) => {
  const { logEvent } = useAnalytics();
  const isSignIn = useCheckSignIn();
  const router = useRouter();
  logEvent("screen_view", {
    firebase_screen: "homepage_bottom",
    firebase_screen_class: "homepage_bottom",
  });

  const navigateToTrial = () => {
    const url = isSignIn ? "/admin" : "/signup";
    setCookie("/");
    router.push(url);
    logEvent("btn_click", {
      btn_name: "homepage_start_free_trial_click",
      btn_position: "bottom",
    });
  };

  const imgProps = {
    src: "/images/landing/check_circle.svg",
    alt: "NEXT ROOM",
    width: 24,
    height: 24,
  };
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
    <motion.div className="pc-wrapper9" ref={ref}>
      <motion.div
        className="pc-main9"
        ref={inViewRef}
        variants={boxVariants}
        initial="hidden"
        animate={controls}
      >
        <p className="pc-title8">
          아직 망설여지나요?
          <br />
          체험 후 결정하세요.
        </p>
        <ul className="pc-list-cont">
          <li className="pc-list-item">
            <Image {...imgProps} />
            개업 전 테스트 가능
          </li>
          <li className="pc-list-item">
            <Image {...imgProps} />
            모든 기능 사용 가능
          </li>
          <li className="pc-list-item">
            <Image {...imgProps} />
            찾아가는 설명 안내(서울, 인천, 경기)
          </li>
        </ul>
        <button className="pc-btn" onClick={navigateToTrial}>
          지금 바로 시작하기
        </button>
      </motion.div>
    </motion.div>
  );
});

export default Component9;
