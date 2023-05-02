import { CryptoCardProps } from "./types";
import "./cryptoCard.scss";
import { getDefaultClassName } from "../../utils/getDefaultClassName";

export const CryptoCard: React.FC<CryptoCardProps> = (props) => {
  const { logoURL, name, shortName, testId } = props;

  const className = getDefaultClassName(props, ["cryptocurrency-component"]);

  return (
    <div className={className} data-testid={testId}>
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
