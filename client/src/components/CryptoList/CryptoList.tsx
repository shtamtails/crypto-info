import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
} from "../../UI/Table";
import { CryptoListElement } from "./CryptoListElement";
import "./cryptoList.scss";
import { useEffect, useState } from "react";
import { Button } from "../../UI/Button";
import { getCryptoLogo } from "../../utils/API";
import { RouterOutput, client } from "../../utils/tRPC";

export const CryptoList: React.FC = () => {
  const [assetsOffset, setAssetsOffset] = useState<number>(0);
  const [assets, setAssets] = useState<RouterOutput["fetchAssets"]>([]);
  const [assetsLoading, setAssetsLoading] = useState<boolean>(false);

  const assetsPerLoad = 5;

  const loadAssets = async () => {
    setAssetsLoading(true);
    const assets = await client.fetchAssets.query({
      limit: assetsPerLoad,
      offset: assetsOffset,
    });
    setAssets((prev) => [...prev, ...assets]);
    setAssetsLoading(false);
  };

  useEffect(() => {
    loadAssets();
  }, [assetsOffset]);

  return (
    <div className="crypto-list">
      <Table className="crypto-list__table">
        <TableHeader
          className="crypto-list__table__head"
          style={{ backgroundColor: "#f1f3f5" }}
        >
          <TableRow>
            <TableHeaderCell
              alignCenter
              className="crypto-list__table__th__rank"
            >
              Rank
            </TableHeaderCell>
            <TableHeaderCell alignLeft className="crypto-list__table__th__name">
              Name
            </TableHeaderCell>
            <TableHeaderCell className="crypto-list__table__th__price">
              Price
            </TableHeaderCell>
            <TableHeaderCell className="crypto-list__table__th__market-cap">
              Market Cap
            </TableHeaderCell>
            <TableHeaderCell className="crypto-list__table__th__vwap">
              VWAP (24Hr)
            </TableHeaderCell>
            <TableHeaderCell className="crypto-list__table__th__supply">
              Supply
            </TableHeaderCell>
            <TableHeaderCell className="crypto-list__table__th__volume">
              Volume (24Hr)
            </TableHeaderCell>
            <TableHeaderCell className="crypto-list__table__th__change">
              Change (24Hr)
            </TableHeaderCell>
            <TableHeaderCell className="crypto-list__table__th__action">
              Action
            </TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody
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
