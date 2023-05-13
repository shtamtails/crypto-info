import { PortfolioElementProps } from ".";
import { getCryptoLogo } from "../../utils/API";
import { formatNumber } from "../../utils/formatNumber/formatNumber";

export const HeaderPortfolioElement: React.FC<PortfolioElementProps> = (
  props
) => {
  const { name, priceUsd, symbol } = props;

  return (
    <div
      className="header__portfolio__element"
      data-testid="header_portfolio_element"
    >
      <div className="header__portfolio__element__logo">
        <img src={getCryptoLogo(symbol)} />
      </div>
      <div className="header__portfolio__element__name">{name}</div>
      <div
        className="header__portfolio__element__value"
        data-testid="header_portfolio_element_value"
      >
        {formatNumber(priceUsd)}$
      </div>
    </div>
  );
};
