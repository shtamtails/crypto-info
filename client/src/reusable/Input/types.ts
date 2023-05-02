import { HTMLInputTypeAttribute, ReactNode } from "react";
import { DefaultProps } from "../../models/defaultProps";

export interface InputProps extends DefaultProps {
  value?: string;
  setValue?: (arg0: string) => void;
  label?: string;
  placeholder?: string;
  icon?: string | ReactNode | JSX.Element;
  type?: HTMLInputTypeAttribute;
  error?: string;
}
