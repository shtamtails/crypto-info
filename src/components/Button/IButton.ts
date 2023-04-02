import { defaultProps } from "../../models/defaultProps";

export interface ButtonProps extends defaultProps {
  children: JSX.Element | string;
  fullWidth?: boolean;
  variant?: "regular" | "outline";
  className?: string;
  onClick?: () => any;
}
