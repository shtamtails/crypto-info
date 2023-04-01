export const PortfolioElement = () => {
  return (
    <div className="header_portfolio_element">
      <div className="header_portfolio_element-logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png" />
      </div>
      <div className="header_portfolio_element-name">Bitcoin</div>
      <div className="header_portfolio_element-value">1234,56$</div>
      <div className="header_portfolio_element-priceChange">+12,34$</div>
      <div className="header_portfolio_element-percentChange">(+1,80%)</div>
    </div>
  );
};
