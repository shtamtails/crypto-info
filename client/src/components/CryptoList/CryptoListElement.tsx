import { Link } from "react-router-dom";
import { Button } from "../../reusable/Button";
import { CryptoCard } from "../../reusable/CryptoCard";
import { TableRow, TableDataCell } from "../../reusable/Table";
import { useContext } from "react";
import { PortfolioContext } from "../../context/PortfolioContext";
import { abbreviateNumber } from "../../utils/abbreviateNumber/abbreviateNumber";

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
  const { setAddCryptoModalOpened, setSelectedCrypto } =
    useContext(PortfolioContext);

  const isPercentPositive = +props.changePercent > 0;

  return (
    <TableRow
      className="crypto-list__table__element"
      testId="crypto-list-element"
    >
      <TableDataCell alignCenter className="crypto-list__table__element__rank">
        {props.rank}
      </TableDataCell>
      <TableDataCell
        className="crypto-list__table__element__name"
        testId="crypto-list_element_name"
      >
        <Link to={props.id}>
          <CryptoCard
            name={props.name}
            logoURL={props.iconURL}
            shortName={props.shortName}
          />
        </Link>
      </TableDataCell>
      <TableDataCell
        alignCenter
        className="crypto-list__table__element__price"
        testId="crypto-list_element_price"
      >
        ${Number(props.price).toFixed(2)}
      </TableDataCell>
      <TableDataCell
        alignCenter
        className="crypto-list__table__element__market-cap"
      >
        ${abbreviateNumber(props.marketCap)}
      </TableDataCell>
      <TableDataCell alignCenter className="crypto-list__table__element__vwap">
        ${abbreviateNumber(props.vwap)}
      </TableDataCell>
      <TableDataCell
        alignCenter
        className="crypto-list__table__element__supply"
      >
        {abbreviateNumber(props.supply)}
      </TableDataCell>
      <TableDataCell
        alignCenter
        className="crypto-list__table__element__volume"
      >
        ${abbreviateNumber(props.volume)}
      </TableDataCell>
      <TableDataCell
        alignCenter
        className={`crypto-list__table__element__change ${
          isPercentPositive ? "color-positive" : "color-negative"
        }`}
      >
        {Number(props.changePercent).toFixed(2)}%
      </TableDataCell>
      <TableDataCell
        alignCenter
        className="crypto-list__table__element__action flex jcc"
      >
        <Button
          testId="add-crypto-button"
          variant="regular"
          className="crypto-list__table__element__action__button"
          onClick={() => {
            setAddCryptoModalOpened(true);
            setSelectedCrypto({
              name: props.name,
              id: props.id,
              symbol: props.shortName,
            });
          }}
        >
          +
        </Button>
      </TableDataCell>
    </TableRow>
  );
};
