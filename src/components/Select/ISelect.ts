import { defaultProps } from "../../models/defaultProps";
import { InputProps } from "../Input/IInput";
import { dataType } from "./Select";

export interface SelectProps extends defaultProps, InputProps {
  data: dataType[];
}
