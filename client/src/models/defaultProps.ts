import { CSSProperties } from "react";

type sizes = "xs" | "sm" | "md" | "lg" | "xl";
export interface defaultProps {
  pl?: sizes;
  pr?: sizes;
  pt?: sizes;
  pb?: sizes;
  ml?: sizes;
  mr?: sizes;
  mt?: sizes;
  mb?: sizes;
  width?: number | string;
  height?: number | string;
  radius?: sizes;
  fullWidth?: boolean;
  style?: CSSProperties | undefined;
  className?: string;
}
