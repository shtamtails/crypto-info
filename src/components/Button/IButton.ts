import { Sizing } from "../../models/ISizing";

export interface ButtonProps extends Sizing {
  children: string;
  fullWidth?: boolean;
  variant?: "regular" | "outline";
  className?: string;
  onClick?: () => any;
}
