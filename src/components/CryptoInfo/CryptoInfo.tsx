import { useEffect, useState } from "react";
import { Button } from "../../reusable/Button";
import { PriceChart } from "./PriceChart";
import "./cryptoInfo.scss";
import { fetchPriceHistory, timePeriods } from "../../utils/API";
import { fetchAssetInfo } from "../../utils/API/api";
import { AssetData } from "../../utils/API/types";
import { abbreviateNumber } from "../../utils/abbreviateNumber";
import { formatNumber } from "../../utils/formatStringToNum";

export const CryptoInfo: React.FC = () => {
  const [time, setTime] = useState<string[]>([""]);
  const [prices, setPrices] = useState<number[]>([0]);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<timePeriods>("1d");
  const [assetInfo, setAssetInfo] = useState<AssetData | null>(null);

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
        const formattedDate = date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        });
        const formattedTime = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
        if (selectedTimePeriod === "1d" || selectedTimePeriod === "1w") {
          return `${formattedTime}`;
        } else {
          return `${formattedDate}`;
        }
      })
    );
    setPrices(priceData.map((d) => parseFloat(d.priceUsd)));
  };

  const loadAssetInfo = async () => {
    const assetInfo = await fetchAssetInfo("bitcoin");
    assetInfo.priceUsd = formatNumber(assetInfo.priceUsd);
    assetInfo.changePercent24Hr = formatNumber(assetInfo.changePercent24Hr);
    assetInfo.maxSupply = abbreviateNumber(assetInfo.maxSupply);
    assetInfo.vwap24Hr = abbreviateNumber(assetInfo.vwap24Hr);
    assetInfo.marketCapUsd = abbreviateNumber(assetInfo.marketCapUsd);
    assetInfo.volumeUsd24Hr = abbreviateNumber(assetInfo.volumeUsd24Hr);
    setAssetInfo(assetInfo);
  };

  useEffect(() => {
    loadPriceHistory();
    loadAssetInfo();
  }, [selectedTimePeriod]);

  const getClassNameColor = (changePercent: string | undefined) => {
    if (changePercent) {
      return Number(changePercent) > 0 ? "color-positive" : "color-negative";
    } else {
      return "";
    }
  };

  return (
    <div className="crypto-info">
      <div className="crypto-info_header">
        <div className="crypto-info_header-crypto">
          <div className="crypto-info_header-crypto-icon">
            <img src="https://assets.coincap.io/assets/icons/btc@2x.png" />
          </div>
          <div className="crypto-info_header-crypto-main">
            <div className="crypto-info_header-crypto-main-name">
              {assetInfo?.name || "..."} ({assetInfo?.symbol || "..."})
            </div>
            <div className="crypto-info_header-crypto-main-date">02 April 2023</div>
          </div>
        </div>
        <div className="crypto-info_header-stats">
          <div className="crypto-info_header-stats-col crypto-info_high-low">
            <div className="crypto-info_header-stats-col-row ">
              <span>VWAP (24HR)</span> ${assetInfo?.vwap24Hr || "..."}
            </div>
            <div className="crypto-info_header-stats-col-row">
              <span>MAX SUPPLY</span> {assetInfo?.maxSupply || "..."}
            </div>
          </div>
          <div className="crypto-info_header-stats-col">
            <div className="crypto-info_header-stats-col-row">
              <span>AVERAGE</span> ${assetInfo?.priceUsd || "..."}
            </div>
            <div className={`crypto-info_header-stats-col-row ${getClassNameColor(assetInfo?.changePercent24Hr)}`}>
              <span>CHANGE</span> {assetInfo?.changePercent24Hr || "..."}%
            </div>
          </div>
          <div className="crypto-info_header-stats-col crypto-info_marketcap-volume">
            <div className="crypto-info_header-stats-col-row">
              <span>MARKET CAP</span> ${assetInfo?.marketCapUsd || "..."}
            </div>
            <div className="crypto-info_header-stats-col-row">
              <span>VOLUME</span> (24HR) ${assetInfo?.volumeUsd24Hr || "..."}
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
        <div className="crypto-info_body-controls">{timePeriodButtons}</div>
      </div>
    </div>
  );
};
