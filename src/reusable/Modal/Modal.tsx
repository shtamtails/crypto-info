import { AiOutlineClose } from "react-icons/ai";
import { getDefaultClassName } from "../../utils/getDefaultClassName";
import { Button } from "../Button";
import { ModalProps } from "./types";
import "./modal.scss";

export const Modal: React.FC<ModalProps> = (props) => {
  const { visible, setVisible, children, title, zIndex, width } = props;

  const handleClose = () => {
    setVisible(false);
  };

  const defaultClassName = ["modal"];
  const className = getDefaultClassName(props, defaultClassName);

  return visible ? (
    <div className={className} style={{ zIndex: zIndex }}>
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
