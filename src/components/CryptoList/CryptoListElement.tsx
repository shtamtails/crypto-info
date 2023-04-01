import { Button } from "../Button/Button";
import { CryptoListElementProps } from "./ICryptoList";

export const CryptoListElement: React.FC<CryptoListElementProps> = (props) => {
  const { rank, iconURL, name, shortName, price, marketCap, vwap, supply, volume, changePercent } = props;
  return (
    <tr className="crypto-list_element">
      <td className="crypto-list_element-rank text-center">1</td>

      <td className="crypto-list_element-name text-left">
        <div className="crypto-list_element-name-icon">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png" />
        </div>

        <div className="flex-col ais">
          <div className="crypto-list_element-name-value">{name}</div>
          <div className="crypto-list_element-name-short">{shortName}</div>
        </div>
      </td>

      <td className="crypto-list_element-price text-center">{price}</td>
      <td className="crypto-list_element-market-cap text-center">{marketCap}</td>
      <td className="crypto-list_element-vwap text-center">{vwap}</td>
      <td className="crypto-list_element-supply text-center">{supply}</td>
      <td className="crypto-list_element-volume text-center">{volume}</td>
      <td className="crypto-list_element-change text-center">{changePercent}</td>
      <td className="crypto-list_element-action text-center">
        <Button variant="regular">+</Button>
      </td>
    </tr>
  );
};
