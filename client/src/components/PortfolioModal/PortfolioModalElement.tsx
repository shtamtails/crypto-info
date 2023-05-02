import { AiOutlineEdit } from "react-icons/ai";
import { Button } from "../../reusable/Button";
import { CryptoCard } from "../../reusable/CryptoCard";
import { TableRow, TableDataCell } from "../../reusable/Table";
import { getCryptoLogo } from "../../utils/API";
import { formatNumber } from "../../utils/formatNumber";
import { useContext } from "react";
import { EditCryptoContext, PortfolioContext } from "../../context";
import { PortfolioModalElementProps } from "./types";

export const PortfolioModalElement: React.FC<PortfolioModalElementProps> = (
  props
) => {
  const { amount, name, priceUsd, id, symbol, number, oldPriceUsd } = props;

  const {
    setEditCryptoModalOpened,
    setEditCryptoAmountId,
    setEditCryptoAmount,
  } = useContext(EditCryptoContext);

  const { setSelectedCrypto } = useContext(PortfolioContext);

  const handleEditCryptoModalOpen = () => {
    setEditCryptoModalOpened(true);
    setEditCryptoAmountId(id);
    setEditCryptoAmount(amount.toString());
    setSelectedCrypto({ name: name, id: id, symbol: symbol });
  };

  const priceChange = +priceUsd - oldPriceUsd;
  const pricePercentChange = ((+priceUsd - oldPriceUsd) / oldPriceUsd) * 100;

  return (
    <TableRow testId="portfolio-modal_row">
      <TableDataCell className="portfolio__modal__table__body__number">
        {number}
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
      <TableDataCell
        alignCenter
        className="portfolio__modal__table__body__price"
        testId="portfolio-modal_element_price"
      >
        {formatNumber(priceUsd)}$
      </TableDataCell>
      <TableDataCell
        alignCenter
        className={`portfolio__modal__table__body__price-change ${
          priceChange >= 0 ? "color-positive" : "color-negative"
        } `}
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
        <Button
          variant="regular"
          onClick={handleEditCryptoModalOpen}
          testId="portfolio-modal_edit-button"
        >
          <AiOutlineEdit />
        </Button>
      </TableDataCell>
    </TableRow>
  );
};
