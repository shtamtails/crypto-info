import { AiOutlineMenu } from "react-icons/ai";
import { FcBriefcase } from "react-icons/fc";
import { Button } from "../../UI/Button";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { HeaderPortfolioElement } from "./HeaderPortfolioElement";
import { RouterOutput, client } from "../../utils/tRPC";
import { formatNumber } from "../../utils/formatNumber/formatNumber";
import { ModalContext } from "../../context/ModalContext/ModalContext";
import { PortfolioContext } from "../../context/PortfolioContext/PortfolioContext";
import { getCryptoLogo } from "../../utils/API";
import { BiBriefcase } from "react-icons/bi";
import "./Header.styles.scss";

export const Header: React.FC = () => {
  const { setPortfolioModalOpened } = useContext(ModalContext);
  const { portfolio } = useContext(PortfolioContext);

  const [popularAssets, setPopularAssets] = useState<
    RouterOutput["fetchAssets"]
  >([]);

  useEffect(() => {
    (async () => {
      const fetchedPopularAssets = await client.fetchAssets.query({
        limit: 3,
        offset: 0,
      });
      setPopularAssets(fetchedPopularAssets);
    })();
  }, []);

  const newPortfolioSum = portfolio?.newOverallSum || 0;
  const oldPortfolioSum = portfolio?.oldOverallSum || 0;
  const priceDifference = formatNumber(
    newPortfolioSum - oldPortfolioSum,
    "fixed"
  );
  const priceDifferencePercent = formatNumber(
    ((newPortfolioSum - oldPortfolioSum) / oldPortfolioSum) * 100,
    "fixed"
  );

  return (
    <header className="header">
      <div className="header__portfolio">
        {popularAssets.map((asset) => (
          <HeaderPortfolioElement
            key={asset.id}
            name={asset.name}
            value={`${formatNumber(asset.priceUsd, "fixed")}$`}
            logo={<img src={getCryptoLogo(asset.symbol) || ""} />}
          />
        ))}
        {portfolio && portfolio.items.length > 0 && (
          <HeaderPortfolioElement
            name="Portfolio value"
            value={
              <>
                {formatNumber(newPortfolioSum, "fixed")}$
                <span
                  className={`margin-left-sm ${
                    +priceDifference >= 0 ? "color-positive" : "color-negative"
                  }`}
                >
                  {priceDifference}$ ({priceDifferencePercent}%)
                </span>
              </>
            }
            logo={<FcBriefcase size={20} />}
          />
        )}
      </div>
      <div className="header__logo">
        <Link to="/">
          <img src="https://coincap.io/static/logos/black.svg" />
        </Link>
      </div>
      <div className="header__links">
        <Button
          leftIcon={<BiBriefcase />}
          variant="regular"
          className="header__links__button"
          testId="header_portfolio-button"
          onClick={() => setPortfolioModalOpened(true)}
        >
          My Portfolio
        </Button>
        <Button
          variant="regular"
          className="header__links__icon"
          onClick={() => setPortfolioModalOpened(true)}
        >
          <AiOutlineMenu />
        </Button>
      </div>
    </header>
  );
};
