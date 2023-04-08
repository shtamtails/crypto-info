import { forwardRef } from "react";
import { getDefaultClassName } from "../../utils/getDefaultClassName";
import { InputProps } from "./types";
import "./input.scss";

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { value, setValue, label, placeholder, icon, type, error } = props;

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
          type={type}
          className={className}
          placeholder={placeholder}
          ref={ref}
          value={value}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
        {icon && <div className="input__container__base__icon">{icon}</div>}
      </div>
      {error && <div className="input__container__error">{error}</div>}
    </div>
  );
});
