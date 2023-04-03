import { AiOutlineMenu } from "react-icons/ai";
import { Button } from "../../reusable/Button";
import { PortfolioElement } from "./PortfolioElement";
import "./header.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";

export const Header: React.FC = () => {
  const { setPortfolioModalOpened } = useContext(ModalContext);

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
        <Button
          variant="regular"
          className="header_links-button"
          onClick={() => {
            setPortfolioModalOpened(true);
          }}
        >
          My Portfolio
        </Button>
        <Button
          variant="regular"
          className="header_links-icon"
          onClick={() => {
            setPortfolioModalOpened(true);
          }}
        >
          <AiOutlineMenu />
        </Button>
      </div>
    </header>
  );
};
