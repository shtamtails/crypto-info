import { Button } from "../Button/Button";
import { TableDataCell, TableRow } from "../Table/Table";
import { CryptoListElementProps } from "./ICryptoList";

export const CryptoListElement: React.FC<CryptoListElementProps> = (props) => {
  const { rank, iconURL, name, shortName, price, marketCap, vwap, supply, volume, changePercent } = props;
  return (
    <TableRow className="crypto-list_element">
      <TableDataCell alignCenter className="crypto-list_element-rank">
        {rank}
      </TableDataCell>

      <TableDataCell className="crypto-list_element-name">
        <div className="crypto-list_element-name-icon">
          <img src={iconURL} />
        </div>

        <div className="flex-col ais">
          <div className="crypto-list_element-name-value">{name}</div>
          <div className="crypto-list_element-name-short">{shortName}</div>
        </div>
      </TableDataCell>

      <TableDataCell alignCenter className="crypto-list_element-price">
        {price}
      </TableDataCell>
      <TableDataCell alignCenter className="crypto-list_element-market-cap">
        {marketCap}
      </TableDataCell>
      <TableDataCell alignCenter className="crypto-list_element-vwap">
        {vwap}
      </TableDataCell>
      <TableDataCell alignCenter className="crypto-list_element-supply">
        {supply}
      </TableDataCell>
      <TableDataCell alignCenter className="crypto-list_element-volume">
        {volume}
      </TableDataCell>
      <TableDataCell alignCenter className="crypto-list_element-change">
        {changePercent}
      </TableDataCell>
      <TableDataCell alignCenter className="crypto-list_element-action">
        <Button variant="regular">+</Button>
      </TableDataCell>
    </TableRow>
  );
};
