import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from "recharts";
import "./cryptoInfo.scss";
import { Button } from "../Button/Button";
import { useEffect, useState } from "react";
import axios from "axios";

export const CryptoInfo: React.FC = () => {
  const defaultData = [
    {
      name: "Page A",
      amt: 28458,
    },
    {
      name: "Page B",
      amt: 28455,
    },
    {
      name: "Page C",
      amt: 28445,
    },
    {
      name: "Page D",
      amt: 28436,
    },
    {
      name: "Page E",
      amt: 28431,
    },
    {
      name: "Page F",
      amt: 28413,
    },
    {
      name: "Page G",
      amt: 28421,
    },
  ];
  const [data, setData] = useState<{ name: string; amt: number }[]>(defaultData);

  const chartFillPositiveColor = "#69db7c";
  const chartStrokePositiveColor = "#40c057";
  const chartFillNegativeColor = "#ff8787";
  const chartStoreNegativeColor = "#fa5252";

  return (
    <div className="crypto-info">
      <div className="crypto-info_header">
        <div className="crypto-info_header-crypto">
          <div className="crypto-info_header-crypto-icon">
            <img src="https://assets.coincap.io/assets/icons/btc@2x.png" />
          </div>
          <div className="crypto-info_header-crypto-main">
            <div className="crypto-info_header-crypto-main-name">Bitcoin (BTC)</div>
            <div className="crypto-info_header-crypto-main-date">02 April 2023</div>
          </div>
        </div>
        <div className="crypto-info_header-stats">
          <div className="crypto-info_header-stats-col crypto-info_high-low">
            <div className="crypto-info_header-stats-col-row ">
              <span>HIGH</span> $28,651.01
            </div>
            <div className="crypto-info_header-stats-col-row">
              <span>LOW</span> $28,362.49
            </div>
          </div>
          <div className="crypto-info_header-stats-col">
            <div className="crypto-info_header-stats-col-row">
              <span>AVERAGE</span> $28,470.40
            </div>
            <div className="crypto-info_header-stats-col-row">
              <span>CHANGE</span> +0.29%
            </div>
          </div>
          <div className="crypto-info_header-stats-col crypto-info_marketcap-volume">
            <div className="crypto-info_header-stats-col-row">
              <span>MARKET CAP</span> $550.97B
            </div>
            <div className="crypto-info_header-stats-col-row">
              <span>VOLUME</span> (24HR) $2,73B
            </div>
          </div>
          <div className="crypto-info_header-stats-col crypto-info_add-button">
            <Button height="100%" variant="regular">
              +
            </Button>
          </div>
        </div>
      </div>
      <div className="crypto-info_body"></div>
    </div>
  );
};
