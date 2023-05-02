import { AiOutlineMenu } from "react-icons/ai";
import { FcBriefcase } from "react-icons/fc";
import { Button } from "../../reusable/Button";
import "./header.scss";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PortfolioContext } from "../../context/PortfolioContext";
import { HeaderPortfolioElement } from "./HeaderPortfolioElement";
import { formatNumber } from "../../utils/formatNumber";
import { RouterOutput, client } from "../../utils/tRPC";

export const Header: React.FC = () => {
  const { setPortfolioModalOpened, newPortfolioSum, portfolio } =
    useContext(PortfolioContext);
  const [topAssets, setTopAssets] = useState<RouterOutput["fetchAssets"]>([]);

  const loadTopAssets = async () => {
    const assets = await client.fetchAssets.query({ limit: 3, offset: 0 });
    setTopAssets(assets);
  };

  useEffect(() => {
    loadTopAssets();
  }, []);

  const [portfolioValue, setPortfolioValue] = useState<number>(0);
  const [priceDifference, setPriceDifference] = useState<number>(0);
  const [priceDifferencePercent, setPriceDifferencePercent] =
    useState<number>(0);

  useEffect(() => {
    setPortfolioValue(newPortfolioSum);
    if (portfolio) {
      const newPriceSum = portfolio.reduce(
        (sum, crypto) => sum + crypto.priceUsd,
        0
      );
      const oldPriceSum = portfolio.reduce(
        (sum, crypto) => sum + crypto.oldPriceUsd,
        0
      );
      const priceDifference = newPriceSum - oldPriceSum;
      setPriceDifference(priceDifference);
      const priceDifferencePercent =
        ((newPriceSum - oldPriceSum) / oldPriceSum) * 100;
      setPriceDifferencePercent(priceDifferencePercent);
    }
  }, [newPortfolioSum, portfolio]);

  return (
    <header className="header">
      <div className="header__portfolio">
        {topAssets.map((asset) => (
          <HeaderPortfolioElement
            key={asset.id}
            name={asset.name}
            symbol={asset.symbol}
            priceUsd={asset.priceUsd}
          />
        ))}
        <div className="header__portfolio__summary">
          <div className="header__portfolio__element__logo">
            <FcBriefcase size={20} />
          </div>
          <div className="header__portfolio__element__name">
            Portfolio value:
          </div>
          <span
            className="header__portfolio__element__value"
            data-testid="header_portfolio-value"
          >
            {formatNumber(portfolioValue)}$
          </span>
          {portfolioValue > 0 && (
            <span
              className={
                priceDifference >= 0 ? "color-positive" : "color-negative"
              }
            >
              {formatNumber(priceDifference)}$ (
              {formatNumber(priceDifferencePercent)}%)
            </span>
          )}
        </div>
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
          testId="header_portfolio-button"
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
