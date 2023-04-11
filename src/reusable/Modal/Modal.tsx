import { AiOutlineClose } from "react-icons/ai";
import { Button } from "../Button";
import { ModalProps } from "./types";
import "./modal.scss";

export const Modal: React.FC<ModalProps> = (props) => {
  const { visible, setVisible, children, title, zIndex, width, className } =
    props;

  const handleClose = () => {
    setVisible(false);
  };

  const classNames = ["modal"];
  className && classNames.push(className);

  return visible ? (
    <div className={classNames.join(" ")} style={{ zIndex: zIndex }}>
      <div className="modal__overlay" onClick={handleClose} />
      <div className="modal__content" style={{ width: width }}>
        <div className="modal__content__header">
          <div className="modal__content__header__title">{title}</div>
          <div className="modal__content__header__close-button">
            <Button variant="regular" onClick={handleClose}>
              <AiOutlineClose />
            </Button>
          </div>
        </div>
        <div className="modal___content__body">{children}</div>
      </div>
    </div>
  ) : null;
};
