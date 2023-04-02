import { defaultProps } from "../../models/defaultProps";

export interface ModalProps extends defaultProps {
  visible: boolean;
  setVisible: (argo0: boolean) => void;
  children: React.ReactNode;
  title: string;
}
