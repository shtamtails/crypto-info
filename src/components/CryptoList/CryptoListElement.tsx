import { Button } from "../../reusable/Button";
import { CryptoCard } from "../../reusable/CryptoCard";
import { TableRow, TableDataCell } from "../../reusable/Table";
import { CryptoListElementProps } from "./types";

export const CryptoListElement: React.FC<CryptoListElementProps> = (props) => {
  const { rank, iconURL, name, shortName, price, marketCap, vwap, supply, volume, changePercent } = props;

  const transformData = (data: string) => {
    return Number(data).toFixed(2);
  };

  return (
    <TableRow className="crypto-list_element">
      <TableDataCell alignCenter className="crypto-list_element-rank">
        {rank}
      </TableDataCell>

      <TableDataCell className="crypto-list_element-name">
        <CryptoCard name={name} logoURL={iconURL} shortName={shortName} />
      </TableDataCell>

      <TableDataCell alignCenter className="crypto-list_element-price">
        ${transformData(price)}
      </TableDataCell>
      <TableDataCell alignCenter className="crypto-list_element-market-cap">
        ${transformData(marketCap)}
      </TableDataCell>
      <TableDataCell alignCenter className="crypto-list_element-vwap">
        ${transformData(vwap)}
      </TableDataCell>
      <TableDataCell alignCenter className="crypto-list_element-supply">
        ${transformData(supply)}
      </TableDataCell>
      <TableDataCell alignCenter className="crypto-list_element-volume">
        ${transformData(volume)}
      </TableDataCell>
      <TableDataCell alignCenter className="crypto-list_element-change">
        {transformData(changePercent)}%
      </TableDataCell>
      <TableDataCell alignCenter className="crypto-list_element-action flex jcc">
        <Button variant="regular">+</Button>
      </TableDataCell>
    </TableRow>
  );
};
