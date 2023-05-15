import { CryptoListElement } from "./CryptoListElement";
import { useEffect, useState } from "react";
import { Button } from "../../UI/Button";
import { getCryptoLogo } from "../../utils/API";
import { RouterOutput, client } from "../../utils/tRPC";
import "./CryptoList.styles.scss";

export const CryptoList: React.FC = () => {
  const [assetsOffset, setAssetsOffset] = useState<number>(0);
  const [assets, setAssets] = useState<RouterOutput["fetchAssets"]>([]);
  const [assetsLoading, setAssetsLoading] = useState<boolean>(false);

  const assetsPerLoad = 5;

  useEffect(() => {
    const loadAssets = async () => {
      setAssetsLoading(true);
      const assets = await client.fetchAssets.query({
        limit: assetsPerLoad,
        offset: assetsOffset,
      });
      setAssets((prev) => [...prev, ...assets]);
      setAssetsLoading(false);
    };
    loadAssets();
  }, [assetsOffset]);

  return (
    <div className="crypto-list">
      <table className="crypto-list__table">
        <thead
          className="crypto-list__table__header"
          style={{ backgroundColor: "#f1f3f5" }}
        >
          <tr>
            <th className="crypto-list__table__header__rank">Rank</th>
            <th className="crypto-list__table__header__name">Name</th>
            <th className="crypto-list__table__header__price">Price</th>
            <th className="crypto-list__table__header__market-cap">
              Market Cap
            </th>
            <th className="crypto-list__table__header__vwap">VWAP (24Hr)</th>
            <th className="crypto-list__table__header__supply">Supply</th>
            <th className="crypto-list__table__header__volume">
              Volume (24Hr)
            </th>
            <th className="crypto-list__table__header__change">
              Change (24Hr)
            </th>
            <th className="crypto-list__table__header__action">Action</th>
          </tr>
        </thead>

        <tbody
          style={{ backgroundColor: "#f8f9fa" }}
          className="crypto-list__table__body"
        >
          {assets.map((asset) => (
            <CryptoListElement
              key={asset.id}
              rank={asset.rank}
              iconURL={getCryptoLogo(asset.symbol)}
              name={asset.name}
              shortName={asset.symbol}
              price={asset.priceUsd}
              marketCap={asset.marketCapUsd}
              vwap={asset.vwap24Hr}
              supply={asset.supply}
              volume={asset.volumeUsd24Hr}
              changePercent={asset.changePercent24Hr}
              id={asset.id}
            />
          ))}
        </tbody>
      </table>
      <Button
        variant="regular"
        fullWidth
        onClick={() => setAssetsOffset((prev) => (prev += assetsPerLoad))}
      >
        {assetsLoading ? "Loading..." : "Load more"}
      </Button>
    </div>
  );
};
