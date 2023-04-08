import { AiOutlineEdit } from "react-icons/ai";
import { Button } from "../../reusable/Button";
import { CryptoCard } from "../../reusable/CryptoCard";
import { TableRow, TableDataCell } from "../../reusable/Table";
import { getCryptoLogo } from "../../utils/API";
import { formatNumber } from "../../utils/formatNumber";
import { useContext, useEffect, useState } from "react";
import { EditCryptoContext } from "../../context";
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

  const handleEditCryptoModalOpen = () => {
    setEditCryptoModalOpened(true);
    setEditCryptoAmountId(id);
    setEditCryptoAmount(amount);
  };

  const priceChange = +priceUsd - oldPriceUsd;
  const pricePercentChange = ((+priceUsd - oldPriceUsd) / oldPriceUsd) * 100;

  useEffect(() => {
    console.log(priceUsd);
    console.log(oldPriceUsd);
  }, []);

  return (
    <TableRow>
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
      <TableDataCell alignCenter>{formatNumber(priceUsd)}$</TableDataCell>
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
        <Button variant="regular" onClick={handleEditCryptoModalOpen}>
          <AiOutlineEdit />
        </Button>
      </TableDataCell>
    </TableRow>
  );
};
