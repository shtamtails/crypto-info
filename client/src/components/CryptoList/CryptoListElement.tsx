import { Link } from "react-router-dom";
import { Button } from "../../UI/Button";
import { CryptoCard } from "../../UI/CryptoCard";
import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext/ModalContext";
import { PortfolioContext } from "../../context/PortfolioContext/PortfolioContext";
import { formatNumber } from "../../utils/formatNumber/formatNumber";

export interface CryptoListElementProps {
  rank: string;
  iconURL: string;
  name: string;
  shortName: string;
  price: string;
  marketCap: string;
  vwap: string;
  supply: string;
  volume: string;
  id: string;
  changePercent: string;
}

export const CryptoListElement: React.FC<CryptoListElementProps> = (props) => {
  const { setAddCryptoModalOpened } = useContext(ModalContext);
  const { setSelectedCrypto } = useContext(PortfolioContext);

  const isPercentPositive = +props.changePercent > 0;

  return (
    <tr className="crypto-list__table__body__element">
      <td className="crypto-list__table__body__element__rank">{props.rank}</td>
      <td className="crypto-list__table__body__element__name">
        <Link to={props.id}>
          <CryptoCard
            className="crypto-list__table__body__element__name-card"
            name={props.name}
            logoURL={props.iconURL}
            symbol={props.shortName}
          />
          <div
            className="crypto-list__table__body__element__name-short"
            onClick={() => setAddCryptoModalOpened(true)}
          >
            {props.name}
          </div>
        </Link>
      </td>
      <td className="crypto-list__table__body__element__price">
        ${Number(props.price).toFixed(2)}
      </td>
      <td className="crypto-list__table__body__element__market-cap">
        ${formatNumber(props.marketCap, "abbreviate")}
      </td>
      <td className="crypto-list__table__body__element__vwap">
        ${formatNumber(props.vwap, "abbreviate")}
      </td>
      <td className="crypto-list__table__body__element__supply">
        {formatNumber(props.supply, "abbreviate")}
      </td>
      <td className="crypto-list__table__body__element__volume">
        ${formatNumber(props.volume, "abbreviate")}
      </td>
      <td
        className={`crypto-list__table__body__element__change ${
          isPercentPositive ? "color-positive" : "color-negative"
        }`}
      >
        {Number(props.changePercent).toFixed(2)}%
      </td>
      <td className="crypto-list__table__body__element__action flex jcc">
        <Button
          testId="add-crypto-button"
          variant="regular"
          className="crypto-list__table__body__element__action__button"
          onClick={() => {
            setSelectedCrypto({
              name: props.name,
              id: props.id,
              symbol: props.shortName,
            });
            setAddCryptoModalOpened(true);
          }}
        >
          +
        </Button>
      </td>
    </tr>
  );
};
