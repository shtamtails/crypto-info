import "./cryptoInfo.scss";
import { Button } from "../Button/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { PriceChart } from "./PriceChart";

export const CryptoInfo: React.FC = () => {
  const [time, setTime] = useState<string[]>(["1", "1", "1", "1", "1", "1", "1"]);
  const [prices, setPrices] = useState<number[]>([1, 2, 3, 4, 5, 6, 7]);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<timePeriods>("1d");

  const handleTimePeriodBntClick = (periood: timePeriods) => {
    setSelectedTimePeriod(periood);
  };

  type timePeriods = "1d" | "1w" | "1m" | "3m" | "6m" | "1y";
  const timePeriods: { label: string; value: timePeriods }[] = [
    { label: "1D", value: "1d" },
    { label: "1W", value: "1w" },
    { label: "1M", value: "1m" },
    { label: "3M", value: "3m" },
    { label: "6M", value: "6m" },
    { label: "1Y", value: "1y" },
  ];

  const generateTimePeriodButton = (timePeriod: { label: string; value: timePeriods }) => {
    const { label, value } = timePeriod;
    const variant = selectedTimePeriod === value ? "regular" : "outline";
    return (
      <Button key={value} variant={variant} radius="xl" onClick={() => handleTimePeriodBntClick(value)}>
        {label}
      </Button>
    );
  };

  const timePeriodButtons = timePeriods.map(generateTimePeriodButton);

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
        <div className="crypto-info_body-pricechart">
          <PriceChart labels={time} data={prices} isChangePositive={true} />
        </div>
        <div className="crypto-info_body-controls">
          {/* FIX RADIUS */}
          {timePeriodButtons}
        </div>
      </div>
    </div>
  );
};
