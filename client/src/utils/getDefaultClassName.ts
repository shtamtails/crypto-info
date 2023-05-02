import { DefaultProps } from "../models/defaultProps";

export const getDefaultClassName = (
  attribute: Omit<DefaultProps, "testId">,
  defaultClassName?: string[]
) => {
  const classNames: string[] = [];
  defaultClassName && Object.assign(classNames, defaultClassName);
  attribute.className && classNames.push(attribute.className);
  attribute.pl && classNames.push(`padding-left-${attribute.pl}`);
  attribute.pr && classNames.push(`padding-right-${attribute.pr}`);
  attribute.pt && classNames.push(`padding-top-${attribute.pt}`);
  attribute.pb && classNames.push(`padding-bottom-${attribute.pb}`);
  attribute.ml && classNames.push(`margin-left-${attribute.ml}`);
  attribute.mr && classNames.push(`margin-right-${attribute.mr}`);
  attribute.mt && classNames.push(`margin-top-${attribute.mt}`);
  attribute.mb && classNames.push(`margin-bottom-${attribute.mb}`);
  attribute.radius && classNames.push(`border-radius-${attribute.radius}`);
  attribute.fullWidth && classNames.push(`fullWidth`);
  return classNames.join(" ");
};
