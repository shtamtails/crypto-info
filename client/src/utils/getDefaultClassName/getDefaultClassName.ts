import { SharedProps } from "../../models/defaultProps";

export interface IGetDefaultClassName {
  props: SharedProps;
  defaultClassName?: string;

  /** Whether to include indents in the class names. */
  withIndents?: boolean;
}

/**
 * Generates a default set of class names based on the provided props.
 *
 * @param {IGetDefaultClassName} options - The options for generating the class names.
 * @returns {string} A string containing the generated class names. Example output = "defaultClassName margin-left-sm fullWidth border-radius-sm"
 *
 */

export const getDefaultClassName = ({
  defaultClassName = "",
  withIndents = false,
  props: { radius, fullWidth, pl, pr, pt, pb, ml, mr, mt, mb } = {},
}: IGetDefaultClassName): string => {
  const classNames: string[] = [defaultClassName];

  if (radius) {
    classNames.push(`border-radius-${radius}`);
  }

  if (fullWidth) {
    classNames.push(`fullWidth`);
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
