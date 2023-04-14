import { HTMLInputTypeAttribute, ReactNode } from "react";
import { defaultProps } from "../../models/defaultProps";

export interface InputProps extends defaultProps {
  value?: string;
  setValue?: (arg0: string) => void;
  label?: string;
  placeholder?: string;
  icon?: string | ReactNode;
  type?: HTMLInputTypeAttribute;
  error?: string;
  testId?: string;
}
