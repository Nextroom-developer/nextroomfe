import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "@/(shared)/utils/firebase";

import useAnalytics from "../../../(shared)/hooks/useAnalytics";

export default function Component2Mobile() {
  const { logEvent } = useAnalytics();
  logEvent("screen_view", {
    firebase_screen: "homepage_carrer",
    firebase_screen_class: "homepage_carrer",
  });
  const arr = [
    { name: `셜록홈즈 방탈출카페`, date: "2017.03 ~ 2017.11" },
    { name: "205번가 방털기 카페", date: "2017.12 ~ 2018.09" },
    { name: "비밀의 화원 강남점", date: "2018.09 ~ 2019.07" },
    { name: "이스케이프탑 강남점", date: "2019.07 ~ 2020.02" },
  ];
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
    <motion.div className="wrapper">
      <p className="sub-title1">왜 넥스트룸일까요?</p>
      <motion.div
        className="wrapper2"
        ref={ref}
        variants={boxVariants}
        initial="hidden"
        animate={controls}
      >
        <div>
          <p className="sub-title2">
            직접 경험해보고
            <br />
            만든 서비스는 다릅니다.
          </p>
        </div>
        <div className="main">
          약 4년간 방탈출 업계에서 일하며, 수없이 많은 손님들을 상대했습니다.{" "}
          <br />
          <br />
          사람이 하는 일에는 필연적으로 실수가 생겼고 이는 곧 손님의 만족도로
          이어졌습니다. <br />
          실수를 없애기 위해 직원용 자동화 앱을 만들었고, 긍정적인 결과를
          얻었습니다. <br />
          <br />
          이제는 더 나아가 시중에 나와있는 힌트폰을 고민했습니다.
          <p>그동안의 노하우를 담아 풀어낸 솔루션이 넥스트룸입니다.</p>
        </div>
      </motion.div>
      <div className="box-wrapper">
        {arr.map(({ name, date }) => (
          <div className="box" key={name}>
            <p>{name}</p>
            <span>{date}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
