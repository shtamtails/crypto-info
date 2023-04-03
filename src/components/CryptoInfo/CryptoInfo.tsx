import { useContext, useEffect, useState } from "react";
import { Button } from "../../reusable/Button";
import { PriceChart } from "./PriceChart";
import "./cryptoInfo.scss";
import { fetchPriceHistory, timePeriods } from "../../utils/API";
import { fetchAssetInfo, getCryptoLogo } from "../../utils/API/api";
import { AssetData, TimePeriods } from "../../utils/API/types";
import { abbreviateNumber } from "../../utils/abbreviateNumber";
import { formatNumber } from "../../utils/formatNumber";
import { useParams } from "react-router-dom";
import { ModalContext } from "../../context/modalContext";

export const CryptoInfo: React.FC = () => {
  const { crypto } = useParams();
  const { setAddCryptoModalOpened } = useContext(ModalContext);
  const [time, setTime] = useState<string[]>([""]);
  const [prices, setPrices] = useState<number[]>([0]);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<TimePeriods>(TimePeriods.ONE_DAY);
  const [assetInfo, setAssetInfo] = useState<AssetData | null>(null);

  const handleTimePeriodBntClick = (period: TimePeriods) => {
    setSelectedTimePeriod(period);
  };

  const timePeriods: { label: string; value: TimePeriods }[] = [
    { label: "1D", value: TimePeriods.ONE_DAY },
    { label: "1W", value: TimePeriods.ONE_WEEK },
    { label: "1M", value: TimePeriods.ONE_MONTH },
    { label: "3M", value: TimePeriods.THREE_MONTHS },
    { label: "6M", value: TimePeriods.SIX_MONTHS },
    { label: "1Y", value: TimePeriods.ONE_YEAR },
  ];

  const generateTimePeriodButton = (timePeriod: { label: string; value: TimePeriods }) => {
    const { label, value } = timePeriod;
    const variant = selectedTimePeriod === value ? "regular" : "outline";
    return (
      <Button key={value} variant={variant} radius="xl" onClick={() => handleTimePeriodBntClick(value)}>
        {label}
      </Button>
    );
  };

  const timePeriodButtons = timePeriods.map(generateTimePeriodButton);

  const loadPriceHistory = async (id: string) => {
    const priceData = await fetchPriceHistory(id, selectedTimePeriod);
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
    if (crypto) {
      const assetInfo = await fetchAssetInfo(crypto);
      assetInfo.priceUsd = formatNumber(assetInfo.priceUsd);
      assetInfo.changePercent24Hr = formatNumber(assetInfo.changePercent24Hr);
      assetInfo.maxSupply = abbreviateNumber(assetInfo.maxSupply);
      assetInfo.vwap24Hr = abbreviateNumber(assetInfo.vwap24Hr);
      assetInfo.marketCapUsd = abbreviateNumber(assetInfo.marketCapUsd);
      assetInfo.volumeUsd24Hr = abbreviateNumber(assetInfo.volumeUsd24Hr);
      setAssetInfo(assetInfo);
    }
  };

  useEffect(() => {
    loadAssetInfo();
  }, [selectedTimePeriod]);

  useEffect(() => {
    assetInfo && loadPriceHistory(assetInfo.id);
  }, [assetInfo]);

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
            <img src={assetInfo ? getCryptoLogo(assetInfo?.symbol) : ""} />
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
              <span>VOLUME (24HR)</span> ${assetInfo?.volumeUsd24Hr || "..."}
            </div>
          </div>
          <div className="crypto-info_header-stats-col crypto-info_add-button">
            <Button
              height="100%"
              variant="regular"
              onClick={() => {
                setAddCryptoModalOpened(true);
              }}
            >
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
