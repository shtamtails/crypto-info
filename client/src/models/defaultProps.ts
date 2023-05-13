import { CSSProperties } from "react";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

export interface DefaultProps {
  className?: string;
  testId?: string;
  style?: CSSProperties;
}

export interface Indents {
  pl?: Size;
  pr?: Size;
  pt?: Size;
  pb?: Size;
  ml?: Size;
  mr?: Size;
  mt?: Size;
  mb?: Size;
}

export interface SharedProps extends DefaultProps, Indents {
  fullWidth?: boolean;
  radius?: Size;
  width?: string | number;
  height?: string | number;
  disabled?: boolean;
}
