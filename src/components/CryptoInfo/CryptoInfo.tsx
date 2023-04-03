import { useEffect, useState } from "react";
import { Button } from "../../reusable/Button";
import { PriceChart } from "./PriceChart";
import "./cryptoInfo.scss";
import { fetchPriceHistory, timePeriods } from "../../utils/API";

export const CryptoInfo: React.FC = () => {
  const [time, setTime] = useState<string[]>([""]);
  const [prices, setPrices] = useState<number[]>([0]);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<timePeriods>("1d");

  const handleTimePeriodBntClick = (period: timePeriods) => {
    setSelectedTimePeriod(period);
  };

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

  const loadPriceHistory = async () => {
    const priceData = await fetchPriceHistory("bitcoin", selectedTimePeriod);
    setTime(
      priceData.map((d) => {
        const date = new Date(d.time);
        const formattedDate = date.toLocaleDateString(undefined, {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        });
        const formattedTime = date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
        return `${formattedDate} ${formattedTime}`;
      })
    );
    setPrices(priceData.map((d) => parseFloat(d.priceUsd)));
  };

  useEffect(() => {
    loadPriceHistory();
  }, [selectedTimePeriod]);

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
