import { ReactNode } from "react";

export interface PortfolioElementProps {
  name: string;
  logo: ReactNode;
  value: ReactNode | string;
}

export const HeaderPortfolioElement: React.FC<PortfolioElementProps> = (
  props
) => {
  const { name, logo, value } = props;

  return (
    <div
      className="header__portfolio__element"
      data-testid="header_portfolio_element"
    >
      <div className="header__portfolio__element__logo">{logo}</div>
      <div className="header__portfolio__element__name">{name}:</div>
      <div
        className="header__portfolio__element__value"
        data-testid="header_portfolio_element_value"
      >
        {value}
      </div>
    </div>
  );
};
