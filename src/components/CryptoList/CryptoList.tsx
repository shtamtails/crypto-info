import { CryptoListElement } from "./CryptoListElement";
import { CryptoListProps } from "./ICryptoList";
import "./cryptoList.scss";

export const CryptoList: React.FC<CryptoListProps> = (props) => {
  const {} = props;
  return (
    <table className="crypto-list">
      <thead className="crypto-list-head">
        <tr>
          <th className="text-center th-rank">Rank</th>
          <th className="text-left th-name">Name</th>
          <th className="text-center th-price">Price</th>
          <th className="text-center th-market-cap">Market Cap</th>
          <th className="text-center th-vwap">VWAP (24Hr)</th>
          <th className="text-center th-supply">Supply</th>
          <th className="text-center th-volume">Volume (24Hr)</th>
          <th className="text-center th-change">Change (24Hr)</th>
          <th className="text-center th-action">Action</th>
        </tr>
      </thead>
      <tbody>
        <CryptoListElement
          rank={1}
          iconURL="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
          name="Bitcoin"
          shortName="BTC"
          price="$1234,56"
          marketCap="$551,87B"
          vwap="$28,517.65"
          supply="19.33m"
          volume="$3.35b"
          changePercent="0,27%"
        />
        <CryptoListElement
          rank={1}
          iconURL="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
          name="Bitcoin"
          shortName="BTC"
          price="$1234,56"
          marketCap="$551,87B"
          vwap="$28,517.65"
          supply="19.33m"
          volume="$3.35b"
          changePercent="0,27%"
        />
        <CryptoListElement
          rank={1}
          iconURL="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
          name="Bitcoin"
          shortName="BTC"
          price="$1234,56"
          marketCap="$551,87B"
          vwap="$28,517.65"
          supply="19.33m"
          volume="$3.35b"
          changePercent="0,27%"
        />
      </tbody>
    </table>
  );
};
