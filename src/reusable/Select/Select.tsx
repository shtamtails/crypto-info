import { forwardRef } from "react";
import { getDefaultClassName } from "../../utils/getDefaultClassName";
import { SelectProps } from "./types";
import "./select.scss";

export const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const { data, placeholder, value, setValue, label } = props;

  const className = getDefaultClassName(props);

  return (
    <div className="input_container">
      <div className="input_container-label">{label}</div>
      <div className="input select-input">
        <select
          ref={ref}
          className={className}
          value={value}
          onChange={(event) => {
            setValue && setValue(event.target.value);
          }}
        >
          {data?.map((element, index) => (
            <option key={index} value={element.value} placeholder={placeholder}>
              {element.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});