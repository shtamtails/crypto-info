import { ReactNode } from "react";
import { DefaultProps } from "../../models/defaultProps";
import "./Button.style.scss";
import { getDefaultClassName } from "../../utils/getDefaultClassName/getDefaultClassName";

export interface ButtonProps extends DefaultProps {
  children: ReactNode | JSX.Element | string;
  fullWidth?: boolean;
  variant?: "regular" | "outline" | "danger";
  onClick?: () => void;
}

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
