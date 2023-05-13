import { HTMLInputTypeAttribute, ReactNode, forwardRef } from "react";
import { SharedProps } from "../../models/defaultProps";
import { getDefaultClassName } from "../../utils/getDefaultClassName/getDefaultClassName";
import "./Input.styles.scss";

export interface InputProps extends SharedProps {
  value?: string;
  setValue?: (arg0: string) => void;
  label?: string;
  placeholder?: string;
  icon?: ReactNode;
  type?: HTMLInputTypeAttribute;
  error?: string;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    width,
    height,
    className,
    disabled,
    style,
    value,
    setValue,
    label,
    placeholder,
    icon,
    type,
    error,
    required,
    testId,
  } = props;

  const handleChange = (value: string) => {
    setValue && setValue(value);
  };

  const getInputClassName = () => {
    const inputClassName = [];

    icon && inputClassName.push("input-wrapper__container--with-icon");
    className && inputClassName.push(className);
    disabled && inputClassName.push("input--disabled");

    return inputClassName.join(" ").trim();
  };

  const inputClassName = getDefaultClassName({
    props,
    defaultClassName: getInputClassName(),
    withIndents: true,
  });

  return (
    <div className="input-wrapper" data-testid={`${testId}-wrapper`}>
      {label && (
        <label className="input-wrapper__label" data-testid={`${testId}-label`}>
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
            data-testid={`${testId}-icon`}
          >
            {icon}
          </div>
        )}
        <input
          disabled={disabled}
          style={{ width, height, ...style }}
          data-testid={testId}
          type={type}
          className={inputClassName}
          placeholder={placeholder}
          ref={ref}
          value={value}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
      </div>
      {error && (
        <div className="input-wrapper__error" data-testid={`${testId}-error`}>
          {error}
        </div>
      )}
    </div>
  );
});
