import { CSSProperties } from "react";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

export interface DefaultProps {
  pl?: Size;
  pr?: Size;
  pt?: Size;
  pb?: Size;
  ml?: Size;
  mr?: Size;
  mt?: Size;
  mb?: Size;
  radius?: Size;
  width?: number | string;
  height?: number | string;
  fullWidth?: boolean;
  style?: CSSProperties;
  className?: string;
  testId?: string;
}
