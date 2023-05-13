import { HTMLInputTypeAttribute, ReactNode, forwardRef } from "react";
import { DefaultProps } from "../../models/defaultProps";
import { getDefaultClassName } from "../../utils/getDefaultClassName/getDefaultClassName";
import "./Input.styles.scss";

export interface InputProps extends DefaultProps {
  value?: string;
  setValue?: (arg0: string) => void;
  label?: string;
  placeholder?: string;
  icon?: string | ReactNode | JSX.Element;
  type?: HTMLInputTypeAttribute;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { value, setValue, label, placeholder, icon, type, error, testId } =
    props;

  const handleChange = (value: string) => {
    setValue && setValue(value);
  };

  const defaultClassName = [];
  icon && defaultClassName.push("input__container__base--with-icon");
  const className = getDefaultClassName(props, defaultClassName);
  return (
    <div className="input__container">
      {label && <div className="input__container__label">{label}</div>}
      <div className="input__container__base">
        <input
          data-testid={testId}
          type={type}
          className={className}
          placeholder={placeholder}
          ref={ref}
          value={value}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
        {icon && (
          <div
            className="input__container__base__icon"
            data-testid="input-icon"
          >
            {icon}
          </div>
        )}
      </div>
      {error && <div className="input__container__error">{error}</div>}
    </div>
  );
});
