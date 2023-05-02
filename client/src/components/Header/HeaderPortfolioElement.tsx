import { PortfolioElementProps } from "./types";
import { getCryptoLogo } from "../../utils/API";
import { formatNumber } from "../../utils/formatNumber";
import { Skeleton } from "../../reusable/Skeleton/Skeleton";

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
        {symbol ? (
          <img src={getCryptoLogo(symbol)} />
        ) : (
          <Skeleton width={20} height={20} borderRadius="100%" />
        )}
      </div>
      <div className="header__portfolio__element__name">
        {name ? name : <Skeleton width={70} height={16} borderRadius={8} />}
      </div>
      <div
        className="header__portfolio__element__value"
        data-testid="header_portfolio_element_value"
      >
        {priceUsd ? (
          formatNumber(priceUsd)
        ) : (
          <Skeleton width={50} height={16} borderRadius={8} />
        )}
      </div>
    </div>
  );
};
