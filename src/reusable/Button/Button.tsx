import { getDefaultClassName } from "../../utils/getDefaultClassName";
import { ButtonProps } from "./types";
import "./button.scss";

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, variant, width, height, onClick, testId } = props;
  const buttonClassnames = [];
  variant && buttonClassnames.push(`button--${variant}`);
  const className = getDefaultClassName(props, buttonClassnames);
  return (
    <button
      data-testid={testId}
      className={className}
      style={{ width: width, height: height }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
