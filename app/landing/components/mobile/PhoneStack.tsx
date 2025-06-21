import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "@/(shared)/utils/firebase";

import useAnalytics from "../../../(shared)/hooks/useAnalytics";

import Phone1 from "./Phone1";
import Phone2 from "./Phone2";
import Phone3 from "./Phone3";
import Phone4 from "./Phone4";

export default function PhoneStack() {
  const { logEvent } = useAnalytics();
  logEvent("screen_view", {
    firebase_screen: "homepage_function_1",
    firebase_screen_class: "homepage_function_1",
  });

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const opacityOffset = 500; // 낮은 값으로 설정하여 투명도 변화가 빠르게 일어나도록 함

  // const opacity = useTransform(scrollYProgress, (value) => {
  //   const elementTop = ref.current?.offsetTop ?? 0;
  //   const elementHeight = ref.current?.offsetHeight ?? 0;
  //   const progress = (value * 80 - elementTop + elementHeight) / opacityOffset;
  //   return Math.max(0, Math.max(0, progress));
  // });

  const [activeSection, setActiveSection] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     // console.log(ref, "ref?");
  //     if (typeof ref !== "function" && ref?.current) {
  //       const { scrollY } = window;
  //       const sectionHeight = window.innerHeight;
  //       const currentSection = Math.floor(
  //         (scrollY - ref.current.offsetTop) / sectionHeight + 1
  //       );

  //       // console.log("scroll", ref, scrollY, sectionHeight, currentSection);
  //       setActiveSection(currentSection);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [ref]);
  return (
    <motion.div
      className="img-cont"
      ref={ref}
      style={{
        opacity,
      }}
    >
      <Phone1 key="phone1" />
      {activeSection === 1 && <Phone2 key="phone2" />}
      {activeSection === 2 && <Phone3 key="phone3" />}
      {activeSection === 3 && <Phone4 key="phone4" />}
    </motion.div>
  );
}
