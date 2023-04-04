import { useContext, useEffect, useState } from "react";
import { Button } from "../../reusable/Button";
import { PriceChart } from "./PriceChart";
import "./cryptoInfo.scss";
import styles from "./cryptoInfo.module.scss";
import { fetchPriceHistory } from "../../utils/API";
import { fetchAssetInfo, getCryptoLogo } from "../../utils/API/api";
import { AssetData, TimePeriods } from "../../utils/API/types";
import { abbreviateNumber } from "../../utils/abbreviateNumber";
import { formatNumber } from "../../utils/formatNumber";
import { useParams } from "react-router-dom";
import { DefaultContext } from "../../context/context";

export const CryptoInfo: React.FC = () => {
  const { crypto } = useParams();
  const { setAddCryptoModalOpened, setSelectedCrypto } =
    useContext(DefaultContext);
  const [time, setTime] = useState<string[]>([""]);
  const [prices, setPrices] = useState<number[]>([0]);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<TimePeriods>(
    TimePeriods.ONE_DAY
  ); // Default time period in Chart
  const [assetInfo, setAssetInfo] = useState<AssetData | null>(null); // Info about the crypto

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

  const generateTimePeriodButton = (timePeriod: {
    label: string;
    value: TimePeriods;
  }) => {
    const { label, value } = timePeriod;
    const variant = selectedTimePeriod === value ? "regular" : "outline";
    return (
      <Button
        key={value}
        variant={variant}
        radius="xl"
        onClick={() => handleTimePeriodBntClick(value)}
      >
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
        const formattedTime = date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
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
      <div className="crypto-info__header">
        <div className="crypto-info__header__asset">
          <div className="crypto-info__header__asset__icon">
            <img src={assetInfo ? getCryptoLogo(assetInfo?.symbol) : ""} />
          </div>
          <div className="crypto-info__header__asset__main">
            <div className="crypto-info__header__asset__main__name">
              {assetInfo?.name || "..."} ({assetInfo?.symbol || "..."})
            </div>
            <div className="crypto-info__header__asset__main__date">
              02 April 2023
            </div>
          </div>
        </div>
        <div className="crypto-info__header__stats">
          <div className="crypto-info__header__stats__col crypto-info__header__stats__col--vWap-supply">
            <div className="crypto-info__header__stats__col__row ">
              <span>VWAP (24HR)</span> ${assetInfo?.vwap24Hr || "..."}
            </div>
            <div className="crypto-info__header__stats__col__row">
              <span>MAX SUPPLY</span> {assetInfo?.maxSupply || "..."}
            </div>
          </div>
          <div className="crypto-info__header__stats__col">
            <div className="crypto-info__header__stats__col__row">
              <span>AVERAGE</span> ${assetInfo?.priceUsd || "..."}
            </div>
            <div
              className={`crypto-info__header__stats__col__row ${getClassNameColor(
                assetInfo?.changePercent24Hr
              )}`}
            >
              <span>CHANGE</span> {assetInfo?.changePercent24Hr || "..."}%
            </div>
          </div>
          <div className="crypto-info__header__stats__col crypto-info__header__stats__col--market-cap-volume">
            <div className="crypto-info__header__stats__col__row">
              <span>MARKET CAP</span> ${assetInfo?.marketCapUsd || "..."}
            </div>
            <div className="crypto-info__header__stats__col__row">
              <span>VOLUME (24HR)</span> ${assetInfo?.volumeUsd24Hr || "..."}
            </div>
          </div>
          <div className="crypto-info__header__stats__col crypto-info__header__stats__col--add-button">
            <Button
              height="100%"
              variant="regular"
              onClick={() => {
                setAddCryptoModalOpened(true);
                assetInfo &&
                  setSelectedCrypto({
                    name: assetInfo.name,
                    id: assetInfo.id,
                    symbol: assetInfo.symbol,
                  });
              }}
            >
              +
            </Button>
          </div>
        </div>
      </div>
      <div className="crypto-info__body">
        <div className="crypto-info__body__price-chart">
          <PriceChart labels={time} data={prices} isChangePositive={true} />
        </div>
        <div className="crypto-info__body__controls">{timePeriodButtons}</div>
      </div>
    </div>
  );
};
