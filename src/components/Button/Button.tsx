import { ButtonProps } from "./IButton";
import "./button.scss";
export const Button: React.FC<ButtonProps> = (props) => {
  const { children } = props;
  return <button>{children}</button>;
};
