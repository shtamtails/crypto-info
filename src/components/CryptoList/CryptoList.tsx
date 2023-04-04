import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
} from "../../reusable/Table";
import { CryptoListElement } from "./CryptoListElement";
import { CryptoListProps } from "./types";
import "./cryptoList.scss";
import { useEffect, useState } from "react";
import { Button } from "../../reusable/Button";
import { AssetData, fetchAssets, getCryptoLogo } from "../../utils/API";

export const CryptoList: React.FC<CryptoListProps> = (props) => {
  const [assetsOffset, setAssetsOffset] = useState<number>(0);
  const [assets, setAssets] = useState<AssetData[]>([]);
  const [assetsLoading, setAssetsLoading] = useState<boolean>(false);
  const assetsPerLoad = 5;

  const loadAssets = async () => {
    setAssetsLoading(true);
    const assets = await fetchAssets(5, assetsOffset);
    setAssets((prev) => [...prev, ...assets]);
    setAssetsLoading(false);
  };

  useEffect(() => {
    loadAssets();
  }, [assetsOffset]);

  return (
    <div className="crypto-list">
      <Table>
        <TableHeader
          className="crypto-list-head"
          style={{ backgroundColor: "#f1f3f5" }}
        >
          <TableRow>
            <TableHeaderCell alignCenter className="th-rank">
              Rank
            </TableHeaderCell>
            <TableHeaderCell alignLeft className="th-name">
              Name
            </TableHeaderCell>
            <TableHeaderCell className="th-price">Price</TableHeaderCell>
            <TableHeaderCell className="th-market-cap">
              Market Cap
            </TableHeaderCell>
            <TableHeaderCell className="th-vwap">VWAP (24Hr)</TableHeaderCell>
            <TableHeaderCell className="th-supply">Supply</TableHeaderCell>
            <TableHeaderCell className="th-volume">
              Volume (24Hr)
            </TableHeaderCell>
            <TableHeaderCell className="th-change">
              Change (24Hr)
            </TableHeaderCell>
            <TableHeaderCell className="th-action">Action</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody style={{ backgroundColor: "#f8f9fa" }}>
          {assets?.map((asset) => (
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
        </TableBody>
      </Table>
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
