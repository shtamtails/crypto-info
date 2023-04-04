import { Link } from "react-router-dom";
import { Button } from "../../reusable/Button";
import { CryptoCard } from "../../reusable/CryptoCard";
import { TableRow, TableDataCell } from "../../reusable/Table";
import { abbreviateNumber } from "../../utils/abbreviateNumber";
import { CryptoListElementProps } from "./types";
import { useContext } from "react";
import { DefaultContext } from "../../context/context";

export const CryptoListElement: React.FC<CryptoListElementProps> = (props) => {
  const {
    rank,
    iconURL,
    name,
    shortName,
    price,
    marketCap,
    vwap,
    supply,
    volume,
    changePercent,
    id,
  } = props;
  const { setAddCryptoModalOpened, setSelectedCrypto } =
    useContext(DefaultContext);
  const isPercentPositive = +changePercent > 0;
  return (
    <TableRow className="crypto-list_element">
      <TableDataCell alignCenter className="crypto-list_element-rank">
        {rank}
      </TableDataCell>
      <TableDataCell className="crypto-list_element-name">
        <Link to={id}>
          <CryptoCard name={name} logoURL={iconURL} shortName={shortName} />
        </Link>
      </TableDataCell>
      <TableDataCell alignCenter className="crypto-list_element-price">
        ${Number(price).toFixed(2)}
      </TableDataCell>
      <TableDataCell alignCenter className="crypto-list_element-market-cap">
        ${abbreviateNumber(marketCap)}
      </TableDataCell>
      <TableDataCell alignCenter className="crypto-list_element-vwap">
        ${abbreviateNumber(vwap)}
      </TableDataCell>
      <TableDataCell alignCenter className="crypto-list_element-supply">
        {abbreviateNumber(supply)}
      </TableDataCell>
      <TableDataCell alignCenter className="crypto-list_element-volume">
        ${abbreviateNumber(volume)}
      </TableDataCell>
      <TableDataCell
        alignCenter
        className={`crypto-list_element-change ${
          isPercentPositive ? "color-positive" : "color-negative"
        }`}
      >
        {Number(changePercent).toFixed(2)}%
      </TableDataCell>
      <TableDataCell
        alignCenter
        className="crypto-list_element-action flex jcc"
      >
        <Button
          variant="regular"
          onClick={() => {
            setAddCryptoModalOpened(true);
            setSelectedCrypto({ name: name, id: id, symbol: shortName });
          }}
        >
          +
        </Button>
      </TableDataCell>
    </TableRow>
  );
};
