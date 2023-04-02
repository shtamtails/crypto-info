import { forwardRef } from "react";
import { getDefaultClassName } from "../../utils/getDefaultClassName";
import { InputProps } from "./types";
import "./input.scss";

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { value, setValue, label, placeholder, icon } = props;

  const handleChange = (value: string) => {
    setValue && setValue(value);
  };

  const defaultClassName = [];
  icon && defaultClassName.push("input-with-icon");
  const className = getDefaultClassName(props, defaultClassName);
  return (
    <div className="input_container">
      <div className="input_container-label">{label}</div>
      <div className="input">
        <input
          className={className}
          placeholder={placeholder}
          ref={ref}
          value={value}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
        {icon && <div className="input-icon">{icon}</div>}
      </div>
    </div>
  );
});
