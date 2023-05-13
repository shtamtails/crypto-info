import { forwardRef } from "react";
import { DefaultProps } from "../../models/defaultProps";
import { InputProps } from "../Input/Input";
import { getDefaultClassName } from "../../utils/getDefaultClassName/getDefaultClassName";
import "./Select.stories.scss";

export type SelectDataType = { label: string; value: string };

export interface SelectProps extends DefaultProps, Omit<InputProps, "icon"> {
  data: SelectDataType[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const { data, placeholder, value, setValue, label, testId } = props;

    const className = getDefaultClassName({ props: props, withIndents: true });

    return (
      <div className="input__container">
        <div className="input__container__label">{label}</div>
        <div className="input input-select">
          <select
            data-testid={testId}
            ref={ref}
            className={className}
            value={value}
            onChange={(event) => {
              setValue && setValue(event.target.value);
            }}
          >
            {data?.map((element, index) => (
              <option
                key={index}
                value={element.value}
                placeholder={placeholder}
              >
                {element.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
);
