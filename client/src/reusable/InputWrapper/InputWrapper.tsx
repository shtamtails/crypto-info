import { HTMLInputTypeAttribute, ReactNode } from "react";
import { SharedProps } from "../../models/defaultProps";
import { getDefaultClassName } from "../../utils/getDefaultClassName/getDefaultClassName";
import "./InputWrapper.styles.scss";

export interface InputWrapperProps extends SharedProps {
  label?: string;
  placeholder?: string;
  icon?: ReactNode;
  error?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  children: ReactNode;
}

export const InputWrapper: React.FC<InputWrapperProps> = (props) => {
  const { children, label, icon, error, required, testId } = props;

  const wrapperClassName = getDefaultClassName({
    props,
    defaultClassName: "input-wrapper",
    withIndents: true,
  });

  return (
    <div
      className={wrapperClassName}
      data-testid={testId && `${testId}-wrapper`}
    >
      {label && (
        <label
          className="input-wrapper__label"
          data-testid={testId && `${testId}-label`}
        >
          {label}
          {required && (
            <div
              className="input__wrapper__label--required"
              data-testid={`${testId}-label-required`}
            >
              *
            </div>
          )}
        </label>
      )}
      <div className="input-wrapper__container">
        {icon && (
          <div
            className="input-wrapper__container__icon"
            data-testid={testId && `${testId}-icon`}
          >
            {icon}
          </div>
        )}
        {children}
      </div>
      {error && (
        <div
          className="input-wrapper__error"
          data-testid={testId && `${testId}-error`}
        >
          {error}
        </div>
      )}
    </div>
  );
};
