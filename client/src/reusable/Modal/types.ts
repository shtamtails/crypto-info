export interface ModalProps {
  visible: boolean;
  setVisible: (argo0: boolean) => void;
  children: React.ReactNode;
  title: string;
  zIndex?: number;
  width?: number | string;
  className?: string;
  testId?: string;
}
