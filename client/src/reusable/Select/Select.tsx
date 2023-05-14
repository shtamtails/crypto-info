import { forwardRef } from "react";
import { getDefaultClassName } from "../../utils/getDefaultClassName/getDefaultClassName";
import { InputWrapper, InputWrapperProps } from "../InputWrapper/InputWrapper";
import "./Select.stories.scss";

export type SelectDataType = { label: string; value: string };

export interface SelectProps extends Omit<InputWrapperProps, "children"> {
  data: SelectDataType[];
  value?: string;
  setValue?: (arg0: string) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const getSelectClassName = () => {
      const selectClassName = [];

      props.icon && selectClassName.push("input--with-icon");
      props.className && selectClassName.push(props.className);
      props.disabled && selectClassName.push("input--disabled");

      return selectClassName.join(" ").trim();
    };

    const selectClassName = getDefaultClassName({
      props,
      defaultClassName: getSelectClassName(),
      withIndents: false,
    });

    return (
      <InputWrapper {...props}>
        <select
          disabled={props.disabled}
          data-testid={props.testId}
          ref={ref}
          className={selectClassName}
          value={props.value}
          onChange={(event) => {
            props.setValue && props.setValue(event.target.value);
          }}
        >
          {props.data?.map((element, index) => (
            <option
              key={index}
              value={element.value}
              placeholder={props.placeholder}
            >
              {element.label}
            </option>
          ))}
        </select>
      </InputWrapper>
    );
  }
);
