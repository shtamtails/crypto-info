import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from "recharts";
import "./cryptoInfo.scss";
import { Button } from "../Button/Button";

export const CryptoInfo: React.FC = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
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
      <div className="crypto-info_body">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#40C057" fill="#69DB7C" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
