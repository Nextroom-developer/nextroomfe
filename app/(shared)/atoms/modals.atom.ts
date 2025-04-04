import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ModalComponentProps<P = any> {
  Component: React.FC<P>;
  props?: P;
  id: string; // 각 모달에 고유 ID 추가
}

export const modalsState = atom<ModalComponentProps[]>({
  key: "modalsState",
  default: [],
});

export const useModalState = () => useRecoilState(modalsState);
export const useModalStateValue = () => useRecoilValue(modalsState);
export const useModalStateWrite = () => useSetRecoilState(modalsState);
