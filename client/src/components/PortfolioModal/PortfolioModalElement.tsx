import { AiOutlineEdit } from "react-icons/ai";
import { Button } from "../../UI/Button";
import { CryptoCard } from "../../UI/CryptoCard";
import { getCryptoLogo } from "../../utils/API";
import { formatNumber } from "../../utils/formatNumber/formatNumber";
import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext/ModalContext";
import { PortfolioContext } from "../../context/PortfolioContext/PortfolioContext";

export interface PortfolioModalElementProps {
  name: string;
  amount: number | string;
  id: string;
  symbol: string;
  number: number;
  oldPriceUsd: number;
  newPriceUsd: number;
}

export const PortfolioModalElement: React.FC<PortfolioModalElementProps> = (
  props
) => {
  const { amount, name, newPriceUsd, id, symbol, number, oldPriceUsd } = props;
  const { setEditCryptoModalOpened, setPortfolioModalOpened } =
    useContext(ModalContext);
  const { setSelectedCrypto } = useContext(PortfolioContext);

  const handleEditCryptoModalOpen = () => {
    setPortfolioModalOpened(false);
    setEditCryptoModalOpened(true);
    setSelectedCrypto({ name, id, symbol });
  };

  const priceChange = newPriceUsd - oldPriceUsd;
  const pricePercentChange = ((newPriceUsd - oldPriceUsd) / oldPriceUsd) * 100;

  return (
    <>
      <tr>
        <td className="portfolio-modal__table__body__rank">{number}</td>
        <td className="portfolio-modal__table__body__name">
          <div className="portfolio-modal__table__body__name-card">
            <CryptoCard
              name={name}
              logoURL={getCryptoLogo(symbol)}
              symbol={symbol}
            />
          </div>
          <div
            className="portfolio-modal__table__body__name-short"
            onClick={handleEditCryptoModalOpen}
          >
            {name}
          </div>
        </td>
        <td className="portfolio-modal__table__body__amount">{amount}</td>
        <td className="portfolio-modal__table__body__price">
          {formatNumber(newPriceUsd, "fixed")}$
        </td>
        <td className="portfolio-modal__table__body__price-change">
          {formatNumber(priceChange, "fixed")}$
        </td>
        <td className="portfolio-modal__table__body__percent-change">
          {formatNumber(pricePercentChange, "fixed")}%
        </td>
        <td className="portfolio-modal__table__body__actions">
          <Button variant="regular" onClick={handleEditCryptoModalOpen}>
            <AiOutlineEdit />
          </Button>
        </td>
      </tr>
    </>
  );
};
