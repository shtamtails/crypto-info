import { forwardRef } from "react";
import { getDefaultClassName } from "../../utils/getDefaultClassName/getDefaultClassName";
import { InputWrapper, InputWrapperProps } from "../InputWrapper/InputWrapper";
import "./Input.styles.scss";

export interface InputProps extends Omit<InputWrapperProps, "children"> {
  value?: string;
  setValue?: (arg0: string) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const getInputClassName = () => {
    const inputClassName = [];

    props.icon && inputClassName.push("input-wrapper__container--with-icon");
    props.className && inputClassName.push(props.className);
    props.disabled && inputClassName.push("input--disabled");

    return inputClassName.join(" ").trim();
  };

  const inputClassName = getDefaultClassName({
    props,
    defaultClassName: getInputClassName(),
    withIndents: false,
  });

  return (
    <InputWrapper {...props}>
      <input
        disabled={props.disabled}
        style={{ width: props.width, height: props.height, ...props.style }}
        data-testid={props.testId}
        type={props.type}
        className={inputClassName}
        placeholder={props.placeholder}
        ref={ref}
        value={props.value}
        onChange={(e) => {
          props.setValue && props.setValue(e.target.value);
        }}
      />
    </InputWrapper>
  );
});
