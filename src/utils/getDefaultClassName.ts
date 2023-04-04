export const getDefaultClassName = (
  props: any,
  defaultClassName?: string[]
) => {
  const classNames: string[] = [];
  defaultClassName && Object.assign(classNames, defaultClassName);
  props.className && classNames.push(props.className);
  props.pl && classNames.push(`padding-left-${props.pl}`);
  props.pr && classNames.push(`padding-right-${props.pr}`);
  props.pt && classNames.push(`padding-top-${props.pt}`);
  props.pb && classNames.push(`padding-bottom-${props.pb}`);
  props.ml && classNames.push(`margin-left-${props.ml}`);
  props.mr && classNames.push(`margin-right-${props.mr}`);
  props.mt && classNames.push(`margin-top-${props.mt}`);
  props.mb && classNames.push(`margin-bottom-${props.mb}`);
  props.radius && classNames.push(`border-radius-${props.radius}`);
  props.fullWidth && classNames.push(`fullWidth`);
  return classNames.join(" ");
};
