import { AiOutlineEdit } from "react-icons/ai";
import { Button } from "../../reusable/Button";
import { CryptoCard } from "../../reusable/CryptoCard";
import { TableRow, TableDataCell } from "../../reusable/Table";
import { PortfioModalElementProps } from "./types";
import { getCryptoLogo } from "../../utils/API";
import { formatNumber } from "../../utils/formatNumber";
import { useEffect, useState } from "react";
import { fetchAssetInfo } from "../../utils/API/api";

export const PortfolioModalElement: React.FC<PortfioModalElementProps> = (props) => {
  const { amount, name, priceUsd, id, symbol } = props;
  const [priceChange, setPriceChange] = useState<number>(0);
  const [newPrice, setNewPrice] = useState<number>(0);
  const [pricePercentChange, setPricePercentChange] = useState<number>(0);

  const loadCurrentRates = async () => {
    const rates = await fetchAssetInfo(id);
    const newPrice = +amount * +rates.priceUsd;
    setNewPrice(newPrice);
    const oldPrice = priceUsd;
    setPriceChange(newPrice - +oldPrice);
    const pricePercentChange = ((newPrice - +oldPrice) / +oldPrice) * 100;
    setPricePercentChange(pricePercentChange);
  };

  useEffect(() => {
    loadCurrentRates();
  }, []);

  return (
    <TableRow>
      <TableDataCell className="portfolio_modal_table_body-number">1</TableDataCell>
      <TableDataCell>
        <div className="portfolio_modal_table_body-crypto-card">
          <CryptoCard name={name} logoURL={getCryptoLogo(symbol)} shortName={symbol} />
        </div>
        <div className="portfolio_modal_table_body-crypto-name">{name}</div>
      </TableDataCell>
      <TableDataCell alignCenter className="portfolio_modal_table_body-amount">
        {amount}
      </TableDataCell>
      <TableDataCell alignCenter>{formatNumber(newPrice)}$</TableDataCell>
      <TableDataCell alignCenter className="portfolio_modal_table_body-price-change">
        {formatNumber(priceChange)}$
      </TableDataCell>
      <TableDataCell
        alignCenter
        className={`portfolio_modal_table_body-percent ${
          pricePercentChange >= 0 ? "color-positive" : "color-negative"
        }`}
      >
        {formatNumber(pricePercentChange)}%
      </TableDataCell>
      <TableDataCell className="portfolio_modal_table_body-actions flex jcc">
        <Button variant="regular">
          <AiOutlineEdit />
        </Button>
      </TableDataCell>
    </TableRow>
  );
};
