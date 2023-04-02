import { AiOutlineClose } from "react-icons/ai";
import { Button } from "../Button/Button";
import { ModalProps } from "./IModal";
import "./modal.scss";
import { getDefaultClassName } from "../../utils/getDefaultClassName";

export const Modal: React.FC<ModalProps> = (props) => {
  const { visible, setVisible, children, title } = props;

  const handleClose = () => {
    setVisible(false);
  };

  const defaultClassName = ["modal"];
  const className = getDefaultClassName(props, defaultClassName);

  return visible ? (
    <div className={className}>
      <div className="modal_overlay" onClick={handleClose} />
      <div className="modal_content">
        <div className="modal_content_header">
          <div className="modal_content_header-title">{title}</div>
          <div className="modal_content_header-close">
            <Button variant="regular" onClick={handleClose}>
              <AiOutlineClose />
            </Button>
          </div>
        </div>
        <div className="modal_content_body">{children}</div>
      </div>
    </div>
  ) : null;
};
