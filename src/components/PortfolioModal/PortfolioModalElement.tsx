import { AiOutlineEdit } from "react-icons/ai";
import { Button } from "../../reusable/Button";
import { CryptoCard } from "../../reusable/CryptoCard";
import { TableRow, TableDataCell } from "../../reusable/Table";
import { getCryptoLogo } from "../../utils/API";
import { formatNumber } from "../../utils/formatNumber";
import { useContext, useEffect, useState } from "react";
import { fetchAssetInfo } from "../../utils/API/api";
import { Input } from "../../reusable/Input";
import { Modal } from "../../reusable/Modal";
import { DefaultContext } from "../../context";
import { PortfolioModalElementProps } from "./types";

export const PortfolioModalElement: React.FC<PortfolioModalElementProps> = (
  props
) => {
  const { amount, name, priceUsd, id, symbol } = props;
  const { portfolio, setPortfolio } = useContext(DefaultContext);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [newPrice, setNewPrice] = useState<number>(0);
  const [pricePercentChange, setPricePercentChange] = useState<number>(0);

  const [editCryptoModalOpened, setEditCryptoModalOpened] =
    useState<boolean>(false);
  const [editCryptoAmount, setEditCryptoAmount] = useState<string>(
    amount.toString()
  );

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
  }, [amount]);

  const handleEditSubmit = () => {
    const updatedPortfolio = portfolio?.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          amount: +editCryptoAmount,
        };
      }
      return el;
    });

    localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
    updatedPortfolio && setPortfolio(updatedPortfolio);
    setEditCryptoModalOpened(false);
  };

  return (
    <>
      <Modal
        visible={editCryptoModalOpened}
        setVisible={setEditCryptoModalOpened}
        title="Edit crypto"
      >
        <Input
          fullWidth
          value={editCryptoAmount}
          setValue={setEditCryptoAmount}
          label="Edit amount"
        />
        <Button variant="regular" mt="lg" fullWidth onClick={handleEditSubmit}>
          Submit
        </Button>
      </Modal>
      <TableRow>
        <TableDataCell className="portfolio__modal__table__body__number">
          1
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
            onClick={() => {
              setEditCryptoModalOpened(true);
            }}
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
          <Button
            variant="regular"
            onClick={() => {
              setEditCryptoModalOpened(true);
            }}
          >
            <AiOutlineEdit />
          </Button>
        </TableDataCell>
      </TableRow>
    </>
  );
};
