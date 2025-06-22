import Image from "next/image";
import "@/(shared)/utils/firebase";

import useAnalytics from "../../../(shared)/hooks/useAnalytics";

const Phone3 = () => {
  const { logEvent } = useAnalytics();
  logEvent("screen_view", {
    firebase_screen: "homepage_function_3",
    firebase_screen_class: "homepage_function_3",
  });
  const imgProps = {
    src: "/images/landing/hint_phone3.svg",
    alt: "NEXT ROOM",
    width: 180,
    height: 350,
  };

  return (
    <>
      <Image {...imgProps} />
      <div className="mobile-func-description">
        각 테마의 독특한 분위기로
        <br />
        배경화면을 커스텀해보세요.
      </div>
    </>
  );
};

export default Phone3;
