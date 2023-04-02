import { Table, TableHeader, TableRow, TableHeaderCell, TableBody } from "../../reusable/Table";
import { CryptoListElement } from "./CryptoListElement";
import { CryptoListProps } from "./types";
import "./cryptoList.scss";

export const CryptoList: React.FC<CryptoListProps> = (props) => {
  return (
    <Table className="crypto-list">
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
      </TableBody>
    </Table>
  );
};
