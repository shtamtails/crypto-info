import { AiOutlineClose } from "react-icons/ai";
import { Button } from "../Button";
import { ReactNode } from "react";
import "./Modal.styles.scss";

export interface ModalDefaultProps {
  visible: boolean;
  setVisible: (arg0: boolean) => void;
}

export interface ModalExtendedProps extends ModalDefaultProps {
  children: ReactNode;
  title: string;
  zIndex?: number;
  width?: number | string;
  className?: string;
  testId?: string;
}

export const Modal: React.FC<ModalExtendedProps> = (props) => {
  const {
    visible,
    setVisible,
    children,
    title,
    zIndex,
    width,
    className,
    testId,
  } = props;

  const handleClose = () => {
    setVisible(false);
  };

  const classNames = ["modal"];
  className && classNames.push(className);

  return visible ? (
    <div
      className={classNames.join(" ")}
      style={{ zIndex: zIndex }}
      data-testid={testId}
    >
      <div className="modal__overlay" onClick={handleClose} />
      <div className="modal__content" style={{ width: width }}>
        <div className="modal__content__header">
          <div className="modal__content__header__title">{title}</div>
          <div className="modal__content__header__close-button">
            <Button
              variant="regular"
              onClick={handleClose}
              testId="close-modal-button"
            >
              <AiOutlineClose />
            </Button>
          </div>
        </div>
        <div className="modal___content__body">{children}</div>
      </div>
    </div>
  ) : null;
};
