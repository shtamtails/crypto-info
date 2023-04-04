import { useEffect, useState } from "react";
import { PortfolioElementProps } from "./types";
import { getCryptoLogo } from "../../utils/API";
import { formatNumber } from "../../utils/formatNumber";
import { fetchAssetInfo } from "../../utils/API/api";

export const HeaderPortfolioElement: React.FC<PortfolioElementProps> = (props) => {
  const { name, amount, priceUsd, symbol, id } = props;
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [pricePercentChange, setPricePercentChange] = useState<number>(0);

  const loadRates = async () => {
    const { priceUsd: ratesUsd } = await fetchAssetInfo(id);
    const currentPrice = amount * +ratesUsd;
    setCurrentPrice(currentPrice);
    setPriceChange(currentPrice - +priceUsd);
    const pricePercentChange = ((currentPrice - +priceUsd) / +priceUsd) * 100;
    setPricePercentChange(pricePercentChange);
  };

  useEffect(() => {
    loadRates();
  }, [name, amount]);

  return (
    <div className="header_portfolio_element">
      <div className="header_portfolio_element-logo">
        <img src={getCryptoLogo(symbol)} />
      </div>
      <div className="header_portfolio_element-name">{props.name}</div>
      <div className="header_portfolio_element-value">{formatNumber(currentPrice)}$</div>
      <div className="header_portfolio_element-price-change">{formatNumber(priceChange)}$</div>
      <div
        className={`header_portfolio_element-percent-change ${
          pricePercentChange >= 0 ? "color-positive" : "color-negative"
        }`}
      >
        ({formatNumber(pricePercentChange)}%)
      </div>
    </div>
  );
};
