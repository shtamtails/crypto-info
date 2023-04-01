type sizes = "xs" | "sm" | "md" | "lg" | "xl";
export interface Sizing {
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
}
