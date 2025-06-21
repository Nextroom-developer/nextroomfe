import Image from "next/image";
import "@/(shared)/utils/firebase";

export default function Phone1() {
  const imgProps = {
    src: "/images/landing/hint_phone.png",
    alt: "NEXT ROOM",
    width: 180,
    height: 350,
  };

  return (
    <>
      <Image {...imgProps} />
      <div className="title7">
        직관적으로 알 수 있는 시간
        <p className="sub-title7">
          플레이가 시작되면 남은 시간을 그래프와 함께 제공합니다.
        </p>
      </div>
    </>
  );
}
