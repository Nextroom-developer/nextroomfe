import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "../../styles/snap.modules.sass";

import Phone1 from "./Phone1";
import Phone2 from "./Phone2";
import Phone3 from "./Phone3";

const Component2Mobile = () => {
  const [activeSection, setActiveSection] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0.1, 0.12], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current || typeof ref === "function") return;

      const sectionTop = ref.current.offsetTop;
      const scrollY = window.scrollY;
      const sectionHeight = window.innerHeight * 0.5;

      const currentSection = Math.floor(
        (scrollY - sectionTop + sectionHeight / 2) / sectionHeight
      );

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);

  return (
    <motion.div
      className="mobile-img-cont"
      ref={ref}
      style={{
        opacity,
        position: "sticky",
      }}
    >
      <div className="mobile-func-box">
        <h1 className="mobile-title2">
          4년간의 현장 경험으로 탄생한 솔루션 <br />
          운영 실수를 줄이고 손님의 만족도를 높입니다.
        </h1>
        <h4 className="mobile-sub-title2">
          방탈출에만 몰입할 수 있는 특별한 기능을 제공합니다.
        </h4>

        <div className="mobile-func-img-box">
          {activeSection <= 0 && <Phone1 key="phone1" />}
          {activeSection === 1 && <Phone2 key="phone2" />}
          {activeSection >= 2 && <Phone3 key="phone3" />}
        </div>
      </div>
    </motion.div>
  );
};
export default Component2Mobile;
