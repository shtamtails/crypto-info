import { Button } from "../Button/Button";
import { PortfioModalProps } from "./IPortfolioModal";
import "./portfolioModal.scss";

export const PortfolioModal: React.FC<PortfioModalProps> = ({ isVisible, setIsVisible }) => {
  const handleClose = () => {
    setIsVisible(false);
  };

  return isVisible ? (
    <div className="portfolio-modal">
      <div className="portfolio-modal_overlay" onClick={handleClose} />
      <div className="portfolio-modal_content">
        <div className="portfolio-modal_content_header">
          <div className="portfolio-modal_content_header-title">My portfolio</div>
          <div className="portfolio-modal_content_header-close">
            <Button variant="regular" onClick={handleClose}>
              X
            </Button>
          </div>
        </div>
        <div className="portfolio-modal_content_body"></div>
      </div>
    </div>
  ) : null;
};
