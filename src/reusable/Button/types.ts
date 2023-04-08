import { defaultProps } from "../../models/defaultProps";

export interface ButtonProps extends defaultProps {
  children: JSX.Element | string;
  fullWidth?: boolean;
  variant?: "regular" | "outline" | "danger";
  className?: string;
  onClick?: () => any;
}
