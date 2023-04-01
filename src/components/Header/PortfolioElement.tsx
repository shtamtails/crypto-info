import { PortfolioElementProps } from "./IHeader";

export const PortfolioElement: React.FC<PortfolioElementProps> = (props) => {
  return (
    <div className="header_portfolio_element">
      <div className="header_portfolio_element-logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png" />
      </div>
      <div className="header_portfolio_element-name">Bitcoin</div>
      <div className="header_portfolio_element-value">1234,56$</div>
      <div className="header_portfolio_element-price-change">+12,34$</div>
      <div className="header_portfolio_element-percent-change">(+1,80%)</div>
    </div>
  );
};
