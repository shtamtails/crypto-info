import { DefaultProps } from "../../models/defaultProps";
import { InputProps } from "../Input/types";

export type SelectDataType = { label: string; value: string };

export interface SelectProps extends DefaultProps, Omit<InputProps, "icon"> {
  data: SelectDataType[];
}
