import { ReactNode } from "react";

export interface ModalDefaultProps {
  visible: boolean;
  setVisible: (arg0: boolean) => void;
}

export interface ModalExtendedProps extends ModalDefaultProps {
  children: ReactNode;
  title: string;
  zIndex?: number;
  width?: number | string;
  className?: string;
  testId?: string;
}
