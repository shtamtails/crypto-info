import { AiOutlineMenu } from "react-icons/ai";
import { Button } from "../../reusable/Button";
import "./header.scss";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PortfolioContext } from "../../context/PortfolioContext";
import { HeaderPortfolioElement } from "./HeaderPortfolioElement";
import { AssetData, fetchAssets } from "../../utils/API";

export const Header: React.FC = () => {
  const { setPortfolioModalOpened } = useContext(PortfolioContext);
  const [topAssets, setTopAssets] = useState<AssetData[]>([]);

  const loadTopAssets = async () => {
    const assets = await fetchAssets(3, 0);
    setTopAssets(assets);
  };

  useEffect(() => {
    loadTopAssets();
  }, []);

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
