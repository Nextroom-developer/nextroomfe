import { useEffect } from "react";

import "./(styles)/admin.modules.sass";
import Sidebar from "@/admin/(components)/Sidebar";
import ContentArea from "@/admin/(components)/ContentArea";
import useModal from "@/(shared)/hooks/useModal";
import { getLocalStorage } from "@/(shared)/auth/storageUtil";

import Toast from "../(shared)/components/Toast/Toast";
import NotiDialog from "../(shared)/components/Dialog/Noti/Dialog";
import Loader from "../(shared)/components/Loader/Loader";

interface Theme {
  id: number;
  title: string;
  timeLimit: number;
  hintLimit: number;
}

interface Props {
  categories: Theme[];
  selectedTheme: Theme;
  isOpen: boolean;
  isLoading: boolean;
  handleClickSelected: (theme: Theme) => void;
}

function AdminView(props: Props) {
  const { isOpen, isLoading } = props;
  const { open, closeAll } = useModal();
  const isHideDialog = getLocalStorage("hideDialog");

  useEffect(() => {
    closeAll();
    if (!isHideDialog) {
      open(NotiDialog, { type: "put" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) return <Loader />;
  return (
    <div className="admin-main">
      <Sidebar {...props} />
      <ContentArea />
      {isOpen && <Toast />}
    </div>
  );
}

export default AdminView;
