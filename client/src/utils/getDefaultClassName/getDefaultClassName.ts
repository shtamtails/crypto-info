import { SharedProps } from "../../models/defaultProps";

export interface IGetDefaultClassName {
  props: SharedProps;
  defaultClassName?: string;
  withIndents?: boolean;
}

export const getDefaultClassName = ({
  defaultClassName = "",
  withIndents = false,
  props: {
    className,
    radius,
    fullWidth,
    disabled,
    pl,
    pr,
    pt,
    pb,
    ml,
    mr,
    mt,
    mb,
  } = {},
}: IGetDefaultClassName) => {
  const classNames: string[] = [defaultClassName];

  if (disabled) {
    classNames.push("disabled");
  }

  if (className) {
    classNames.push(className);
  }

  if (radius) {
    radius && classNames.push(`border-radius-${radius}`);
  }

  if (fullWidth) {
    fullWidth && classNames.push(`fullWidth`);
  }

  if (withIndents) {
    if (pl) classNames.push(`padding-left-${pl}`);
    if (pr) classNames.push(`padding-right-${pr}`);
    if (pt) classNames.push(`padding-top-${pt}`);
    if (pb) classNames.push(`padding-bottom-${pb}`);
    if (ml) classNames.push(`margin-left-${ml}`);
    if (mr) classNames.push(`margin-right-${mr}`);
    if (mt) classNames.push(`margin-top-${mt}`);
    if (mb) classNames.push(`margin-bottom-${mb}`);
  }

  return classNames.join(" ").trim();
};
