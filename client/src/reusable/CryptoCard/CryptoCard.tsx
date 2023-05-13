import { DefaultProps } from "../../models/defaultProps";
import { getDefaultClassName } from "../../utils/getDefaultClassName/getDefaultClassName";
import "./CryptoCard.style.scss";

export interface CryptoCardProps extends DefaultProps {
  logoURL: string;
  name: string;
  shortName: string;
}

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
