import { forwardRef } from "react";
import { motion } from "framer-motion";

import PhoneStack from "./PhoneStack";

const Component2Mobile = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <motion.div className="wrapper7" ref={ref}>
      <h1 className="pc-title2">
        4년간의 현장 경험으로 탄생한 솔루션 <br />
        운영 실수를 줄이고 손님의 만족도를 높입니다.
      </h1>
      <h4 className="pc-sub-title2">
        방탈출에만 몰입할 수 있는 특별한 기능을 제공합니다.
      </h4>
      <p className="pc-func-title2">
        테마에 몰입되도록
        <br />
        편의성 높은 기능
      </p>
      <PhoneStack />
    </motion.div>
  );
});
export default Component2Mobile;
