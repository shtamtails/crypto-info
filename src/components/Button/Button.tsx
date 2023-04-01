import { getDefaultClassName } from "../../utils/getDefaultClassName";
import { ButtonProps } from "./IButton";
import "./button.scss";

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, variant } = props;
  const buttonClassnames = [];
  variant && buttonClassnames.push(`button-${variant}`);
  const className = getDefaultClassName(props, buttonClassnames);
  return <button className={`${className}`}>{children}</button>;
};
