import { Table, TableHeader, TableRow, TableHeaderCell, TableBody } from "../../reusable/Table";
import { CryptoListElement } from "./CryptoListElement";
import { CryptoListProps } from "./types";
import "./cryptoList.scss";
import { useEffect, useState } from "react";
import { Button } from "../../reusable/Button";
import { AssetData, fetchAssets } from "../../utils/API";

export const CryptoList: React.FC<CryptoListProps> = (props) => {
  const [assetsOffset, setAssetsOffset] = useState<number>(0);
  const [assets, setAssets] = useState<AssetData[] | []>([]);
  const [assetsLoading, setAssetsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setAssetsLoading(true);
      const assets = await fetchAssets(5, assetsOffset);
      setAssets((prev) => [...prev, ...assets.data]);
      setAssetsLoading(false);
    })();
  }, [assetsOffset]);

  const handleLoadMoreClick = () => {
    setAssetsOffset((prev) => (prev += 5));
  };

  return (
    <div className="crypto-list">
      <Table>
        <TableHeader className="crypto-list-head" style={{ backgroundColor: "#f1f3f5" }}>
          <TableRow>
            <TableHeaderCell alignCenter className="th-rank">
              Rank
            </TableHeaderCell>
            <TableHeaderCell alignLeft className="th-name">
              Name
            </TableHeaderCell>
            <TableHeaderCell className="th-price">Price</TableHeaderCell>
            <TableHeaderCell className="th-market-cap">Market Cap</TableHeaderCell>
            <TableHeaderCell className="th-vwap">VWAP (24Hr)</TableHeaderCell>
            <TableHeaderCell className="th-supply">Supply</TableHeaderCell>
            <TableHeaderCell className="th-volume">Volume (24Hr)</TableHeaderCell>
            <TableHeaderCell className="th-change">Change (24Hr)</TableHeaderCell>
            <TableHeaderCell className="th-action">Action</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody style={{ backgroundColor: "#f8f9fa" }}>
          {assets?.map((asset) => (
            <CryptoListElement
              key={asset.id}
              rank={asset.rank}
              iconURL="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
              name={asset.name}
              shortName={asset.symbol}
              price={asset.priceUsd}
              marketCap={asset.marketCapUsd}
              vwap={asset.vwap24Hr}
              supply={asset.supply}
              volume={asset.volumeUsd24Hr}
              changePercent={asset.changePercent24Hr}
            />
          ))}
        </TableBody>
      </Table>
      <Button variant="regular" fullWidth onClick={handleLoadMoreClick}>
        {assetsLoading ? "Loading..." : "Load more"}
      </Button>
    </div>
  );
};
