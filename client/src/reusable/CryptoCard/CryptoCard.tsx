import { CryptoCardProps } from "./types";
import "./cryptoCard.scss";

export const CryptoCard: React.FC<CryptoCardProps> = (props) => {
  const { logoURL, name, shortName, testId } = props;
  return (
    <div className="cryptocurrency-component" data-testid={testId}>
      <div className="cryptocurrency-component__icon">
        <img src={logoURL} alt={`${name} logo`} />
      </div>

      <div className="cryptocurrency-component__info">
        <div
          className="cryptocurrency-component__info__name"
          data-testid="cryptocurrency-component_name"
        >
          {name}
        </div>
        <div className="cryptocurrency-component__info__symbol">
          {shortName}
        </div>
      </div>
    </div>
  );
};
