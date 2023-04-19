import { defaultProps } from "../../models/defaultProps";
import { InputProps } from "../Input/types";

export type dataType = { label: string; value: string };

export interface SelectProps extends defaultProps, Omit<InputProps, "icon"> {
  data: dataType[];
}
