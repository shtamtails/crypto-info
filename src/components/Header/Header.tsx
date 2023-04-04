import { AiOutlineMenu } from "react-icons/ai";
import { Button } from "../../reusable/Button";
import "./header.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DefaultContext } from "../../context/context";
import { HeaderPortfolioElement } from "./HeaderPortfolioElement";

export const Header: React.FC = () => {
  const { setPortfolioModalOpened, portfolio } = useContext(DefaultContext);

  return (
    <header className="header">
      <div className="header_portfolio">
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
