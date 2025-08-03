import Image from "next/image";

import "@/(shared)/utils/firebase";
import useAnalytics from "../../../(shared)/hooks/useAnalytics";

export default function Phone1() {
  const { logEvent } = useAnalytics();
  logEvent("screen_view", {
    firebase_screen: "homepage_function_1",
    firebase_screen_class: "homepage_function_1",
  });
  const imgProps = {
    src: "/images/landing/hint_phone1.svg",
    alt: "NEXT ROOM",
    width: 180,
    height: 350,
  };

  return (
    <>
      <Image {...imgProps} />
      <div className="mobile-func-description">
        플레이 중 남은 시간을
        <br />
        직관적으로 확인할 수 있어요.
      </div>
    </>
  );
}
