import { ReactNode } from "react";
import { DefaultProps } from "../../models/defaultProps";

export interface ButtonProps extends DefaultProps {
  children: ReactNode | JSX.Element | string;
  fullWidth?: boolean;
  variant?: "regular" | "outline" | "danger";
  onClick?: () => void;
}
