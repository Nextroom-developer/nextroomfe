import { useRef } from "react";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import "@/(shared)/utils/firebase";

import useAnalytics from "../../../(shared)/hooks/useAnalytics";

export default function Phone() {
  const { logEvent } = useAnalytics();
  logEvent("screen_view", {
    firebase_screen: "homepage_function_1",
    firebase_screen_class: "homepage_function_1",
  });
  const imgProps = {
    src: "/images/landing/hint_phone.png",
    alt: "NEXT ROOM",
    width: 180,
    height: 350,
  };

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const opacityOffset = 500; // 낮은 값으로 설정하여 투명도 변화가 빠르게 일어나도록 함

  const opacity = useTransform(scrollYProgress, (value) => {
    const elementTop = ref.current?.offsetTop ?? 0;
    const elementHeight = ref.current?.offsetHeight ?? 0;
    const progress = (value * 80 - elementTop + elementHeight) / opacityOffset;
    return Math.max(0, Math.max(0, progress));
  });

  return (
    <motion.div
      className="img-cont"
      ref={ref}
      style={{
        opacity,
      }}
    >
      <Image {...imgProps} />
      <div className="title7">
        직관적으로 알 수 있는 시간
        <p className="sub-title7">
          플레이가 시작되면 남은 시간을 그래프와 함께 제공합니다.
        </p>
      </div>
    </motion.div>
  );
}
