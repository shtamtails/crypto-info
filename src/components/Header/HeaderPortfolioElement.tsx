import { PortfolioElementProps } from "./types";
import { getCryptoLogo } from "../../utils/API";
import { formatNumber } from "../../utils/formatNumber";

export const HeaderPortfolioElement: React.FC<PortfolioElementProps> = (
  props
) => {
  const { name, priceUsd, symbol } = props;

  return (
    <div className="header__portfolio__element">
      <div className="header__portfolio__element__logo">
        <img src={getCryptoLogo(symbol)} />
      </div>
      <div className="header__portfolio__element__name">{name}</div>
      <div className="header__portfolio__element__value">
        {formatNumber(priceUsd)}$
      </div>
    </div>
  );
};
