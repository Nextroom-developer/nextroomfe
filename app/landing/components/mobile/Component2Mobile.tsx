import { motion } from "framer-motion";

import Phone1 from "./Phone1";
import Phone2 from "./Phone2";
import Phone3 from "./Phone3";

import "../../styles/snap.modules.sass";

const Component2Mobile = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <div className="snap-container">
      <div className="mobile-func-box">
        <h1 className="mobile-title2">
          4년간의 현장 경험으로 탄생한 솔루션 <br />
          운영 실수를 줄이고 손님의 만족도를 높입니다.
        </h1>
        <h4 className="mobile-sub-title2">
          방탈출에만 몰입할 수 있는 특별한 기능을 제공합니다.
        </h4>
      </div>

      <div className="snap-section">
        <motion.div {...fadeInUp}>
          <Phone1 />
        </motion.div>
      </div>
      <div className="snap-section">
        <motion.div {...fadeInUp}>
          <Phone2 />
        </motion.div>
      </div>
      <div className="snap-section">
        <motion.div {...fadeInUp}>
          <Phone3 />
        </motion.div>
      </div>
    </div>
  );
};
export default Component2Mobile;
