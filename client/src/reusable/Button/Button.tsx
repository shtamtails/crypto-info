import { ReactNode } from "react";
import { SharedProps } from "../../models/defaultProps";
import { getDefaultClassName } from "../../utils/getDefaultClassName/getDefaultClassName";
import "./Button.style.scss";

export interface ButtonProps extends SharedProps {
  children: ReactNode | JSX.Element | string;
  fullWidth?: boolean;
  variant?: "regular" | "outline" | "danger";
  onClick?: () => void;
  type?: "button" | "submit";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = "regular",
    type = "button",
    leftIcon,
    rightIcon,
    disabled,
    className,
    style,
    children,
    width,
    height,
    onClick,
    testId,
  } = props;

  const getButtonClassName = () => {
    const buttonClassName = [];

    variant && buttonClassName.push(`button--${variant}`);
    disabled && buttonClassName.push("button--disabled");
    className && buttonClassName.push(className);

    return buttonClassName.join(" ").trim();
  };

  const buttonClassName = getDefaultClassName({
    props,
    defaultClassName: getButtonClassName(),
    withIndents: true,
  });

  return (
    <button
      type={type}
      disabled={disabled}
      data-testid={testId}
      className={buttonClassName}
      style={{ width: width, height: height, ...style }}
      onClick={onClick}
    >
      {leftIcon && (
        <div
          className="button-icon margin-right-md"
          data-testid={`${testId}-left-icon`}
        >
          {leftIcon}
        </div>
      )}
      {children}
      {rightIcon && (
        <div
          className="button-icon margin-left-md"
          data-testid={`${testId}-right-icon`}
        >
          {rightIcon}
        </div>
      )}
    </button>
  );
};
