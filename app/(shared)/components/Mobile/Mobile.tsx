import Image from "next/image";

import styles from "./mobile.module.sass";

export default function Mobile() {
  return (
    <div className={styles.wrap}>
      <Image
        src="/images/svg/logo_mobile.svg"
        width={114}
        height={18}
        alt="NEXT ROOM"
      />
      <h1 className={styles.title}>PC로 접속해 주세요.</h1>
      <p className={styles.description}>
        넥스트룸 관리자 페이지는 PC 환경에 최적화 되어있습니다.
      </p>
    </div>
  );
}
