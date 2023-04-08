import { AiOutlineEdit } from "react-icons/ai";
import { Button } from "../../reusable/Button";
import { CryptoCard } from "../../reusable/CryptoCard";
import { TableRow, TableDataCell } from "../../reusable/Table";
import { getCryptoLogo } from "../../utils/API";
import { formatNumber } from "../../utils/formatNumber";
import { useContext, useEffect, useState } from "react";
import { fetchAssetInfo } from "../../utils/API/api";
import { EditCryptoContext } from "../../context";
import { PortfolioModalElementProps } from "./types";

export const PortfolioModalElement: React.FC<PortfolioModalElementProps> = (
  props
) => {
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

  const { setEditCryptoModalOpened, setEditCryptoAmountId } =
    useContext(EditCryptoContext);

  const handleEditCryptoModalOpen = () => {
    setEditCryptoModalOpened(true);
    setEditCryptoAmountId(id);
  };

  useEffect(() => {
    loadCurrentRates();
  }, [amount]);

  return (
    <TableRow>
      <TableDataCell className="portfolio__modal__table__body__number">
        1 FIXME
      </TableDataCell>
      <TableDataCell>
        <div className="portfolio__modal__table__body__crypto-card">
          <CryptoCard
            name={name}
            logoURL={getCryptoLogo(symbol)}
            shortName={symbol}
          />
        </div>
        <div
          className="portfolio__modal__table__body__crypto-name"
          onClick={handleEditCryptoModalOpen}
        >
          {name}
        </div>
      </TableDataCell>
      <TableDataCell
        alignCenter
        className="portfolio__modal__table__body__amount"
      >
        {amount}
      </TableDataCell>
      <TableDataCell alignCenter>{formatNumber(newPrice)}$</TableDataCell>
      <TableDataCell
        alignCenter
        className="portfolio__modal__table__body__price-change"
      >
        {formatNumber(priceChange)}$
      </TableDataCell>
      <TableDataCell
        alignCenter
        className={`portfolio__modal__table__body__percent ${
          pricePercentChange >= 0 ? "color-positive" : "color-negative"
        }`}
      >
        {formatNumber(pricePercentChange)}%
      </TableDataCell>
      <TableDataCell className="portfolio__modal__table__body__actions">
        <Button variant="regular" onClick={handleEditCryptoModalOpen}>
          <AiOutlineEdit />
        </Button>
      </TableDataCell>
    </TableRow>
  );
};
