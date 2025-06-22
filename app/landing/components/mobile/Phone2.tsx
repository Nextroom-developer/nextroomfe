import Image from "next/image";
import "@/(shared)/utils/firebase";

import useAnalytics from "../../../(shared)/hooks/useAnalytics";

const Phone2 = () => {
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
  return (
    <>
      <Image {...imgProps} />
      <div className="mobile-func-description">
        어두운 공간에서 진행하더라도
        <br />
        밝은 빛으로 인한 방해가 없어요.
      </div>
    </>
  );
};

export default Phone2;
