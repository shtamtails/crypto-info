import { DefaultProps, Indents } from "../../models/defaultProps";
import { getDefaultClassName } from "../../utils/getDefaultClassName/getDefaultClassName";
import "./CryptoCard.style.scss";

export interface CryptoCardProps extends DefaultProps, Indents {
  logoURL: string;
  name: string;
  shortName: string;
}

export const CryptoCard: React.FC<CryptoCardProps> = (props) => {
  const { logoURL, name, shortName, testId, className, style } = props;

  const getCryptoCardClassName = () => {
    const cryptoCardClassName = ["crypto-card"];
    className && cryptoCardClassName.push(className);
    return cryptoCardClassName.join(" ").trim();
  };

  const cryptoCardClassName = getDefaultClassName({
    props,
    defaultClassName: getCryptoCardClassName(),
    withIndents: true,
  });

  return (
    <div className={cryptoCardClassName} data-testid={testId} style={style}>
      <div className="crypto-card__icon">
        <img
          src={logoURL}
          alt={`${name} logo`}
          data-testid={`${testId}-icon`}
        />
      </div>

      <div className="crypto-card__info">
        <div className="crypto-card__info__name" data-testid={`${testId}-name`}>
          {name}
        </div>
        <div
          className="crypto-card__info__symbol"
          data-testid={`${testId}-symbol`}
        >
          {shortName}
        </div>
      </div>
    </div>
  );
};
