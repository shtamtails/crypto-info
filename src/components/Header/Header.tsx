import { Button } from "../Button/Button";
import { PortfolioElement } from "./PortfolioElement";
import "./header.scss";

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header_portfolio">
        <PortfolioElement />
        <PortfolioElement />
        <PortfolioElement />
      </div>
      <div className="header_logo">
        <img src="https://coincap.io/static/logos/black.svg" />
      </div>
      <div className="header_links">
        <Button variant="regular" className="header_links-button">
          My Portfolio
        </Button>
        <Button variant="regular" className="header_links-icon">
          +
        </Button>
      </div>
    </header>
  );
};
