import classNames from "classnames";
import { useEffect } from "react";

import { useSnackBarInfo } from "@/(shared)/atoms/snackBar.atom";

import styles from "./snackbar.module.sass";

export default function SnackBar() {
  const [snackInfo, setSnackBarInfo] = useSnackBarInfo();

  useEffect(() => {
    if (snackInfo.isOpen) {
      setTimeout(() => {
        setSnackBarInfo((prev) => ({ ...prev, isOpen: false }));
      }, 3000);
    }
  }, [snackInfo.isOpen]);

  const handleClick = () => {
    setSnackBarInfo({ ...snackInfo, isOpen: false });
  };
  return (
    <div
      className={classNames(styles.box, {
        [styles.snackbarShow]: snackInfo.isOpen,
      })}
    >
      <div className={styles.snackBar} onClick={handleClick} key="bottomleft">
        {snackInfo.message}
      </div>
    </div>
  );
}
