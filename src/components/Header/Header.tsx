import { AiOutlineMenu } from "react-icons/ai";
import { Button } from "../../reusable/Button";
import "./header.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { PortfolioContext } from "../../context/PortfolioContext";
import { HeaderPortfolioElement } from "./HeaderPortfolioElement";

export const Header: React.FC = () => {
  const { setPortfolioModalOpened, portfolio } = useContext(PortfolioContext);

  return (
    <header className="header">
      <div className="header__portfolio">
        {portfolio
          ?.sort((a, b) => b.priceUsd - a.priceUsd)
          .slice(0, 3)
          .map((el) => (
            <HeaderPortfolioElement
              key={el.id}
              name={el.name}
              amount={el.amount}
              priceUsd={el.priceUsd}
              symbol={el.symbol}
              id={el.id}
            />
          ))}
      </div>
      <div className="header__logo">
        <Link to="/">
          <img src="https://coincap.io/static/logos/black.svg" />
        </Link>
      </div>
      <div className="header__links">
        <Button
          variant="regular"
          className="header__links__button"
          onClick={() => {
            setPortfolioModalOpened(true);
          }}
        >
          My Portfolio
        </Button>
        <Button
          variant="regular"
          className="header__links__icon"
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
