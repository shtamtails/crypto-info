import { CryptocurrencyProps } from "./ICryptocurrency";
import "./cryptocurrency.scss";

export const Cryptocurrency: React.FC<CryptocurrencyProps> = (props) => {
  const { logoURL, name, shortName } = props;
  return (
    <div className="cryptocurrency-component">
      <div className="cryptocurrency-component-name-icon">
        <img src={logoURL} />
      </div>

      <div className="flex-col ais">
        <div className="cryptocurrency-component-name-value">{name}</div>
        <div className="cryptocurrency-component-name-short">{shortName}</div>
      </div>
    </div>
  );
};
