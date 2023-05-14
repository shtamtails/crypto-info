import { AiOutlineClose } from "react-icons/ai";
import { Button } from "../Button";
import { ReactNode, useEffect, useRef, useState } from "react";
import { DefaultProps } from "../../models/defaultProps";
import { useClickOutside } from "../../hooks/useClickOutside/useClickOutside";
import "./Modal.styles.scss";

export interface ModalDefaultProps {
  visible: boolean;
  setVisible: (arg0: boolean) => void;
}

export interface ModalExtendedProps extends ModalDefaultProps, DefaultProps {
  title: string;
  children: ReactNode;
  width?: string | number;
  zIndex?: number;
}

export const Modal: React.FC<ModalExtendedProps> = (props) => {
  const {
    className,
    style,
    testId,
    visible,
    setVisible,
    title = "Modal",
    children,
    width,
    zIndex,
  } = props;

  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpacity(0);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setVisible]);

  useEffect(() => {
    setOpacity(1);
  }, []);

  const handleOutsideClick = () => {
    setOpacity(0);
  };

  const modalRef = useRef(null);

  useClickOutside(modalRef, modalRef, handleOutsideClick);

  const getModalContainerClassName = () => {
    const modalContainerClassName = ["modal__inner__container"];
    className && modalContainerClassName.push(className);

    return modalContainerClassName.join(" ").trim();
  };

  return (
    <div className="modal">
      <div
        className="modal__overlay"
        data-testid={`${testId}-overlay`}
        style={{ opacity }}
        onTransitionEnd={() => {
          opacity === 0 && visible && setVisible(false);
        }}
      />
      <div className="modal__inner">
        <div
          className={getModalContainerClassName()}
          data-testid={testId}
          style={{ width, opacity, ...style, zIndex }}
          ref={modalRef}
        >
          <div className="modal__inner__container__header">
            {title}
            <Button
              onClick={handleOutsideClick}
              testId={`${testId}-close-button`}
            >
              <AiOutlineClose />
            </Button>
          </div>
          <div
            className="modal__inner__container__body"
            data-testid={`${testId}-body`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
