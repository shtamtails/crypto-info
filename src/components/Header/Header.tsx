import { AiOutlineMenu } from "react-icons/ai";
import { Button } from "../../reusable/Button";
import { PortfolioElement } from "./PortfolioElement";
import "./header.scss";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header_portfolio">
        <PortfolioElement />
        <PortfolioElement />
        <PortfolioElement />
      </div>
      <div className="header_logo">
        <Link to="/">
          <img src="https://coincap.io/static/logos/black.svg" />
        </Link>
      </div>
      <div className="header_links">
        <Button variant="regular" className="header_links-button">
          My Portfolio
        </Button>
        <Button variant="regular" className="header_links-icon">
          <AiOutlineMenu />
        </Button>
      </div>
    </header>
  );
};
