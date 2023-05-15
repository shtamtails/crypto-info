import { useContext, useEffect, useState } from "react";
import { Button } from "../../UI/Button";
import { PriceChart, TimePeriod, TimePeriods } from "./PriceChart";
import { getCryptoLogo } from "../../utils/API/api";
import { useParams } from "react-router-dom";
import { RouterOutput, client } from "../../utils/tRPC";
import { formatNumber } from "../../utils/formatNumber/formatNumber";
import { ModalContext } from "../../context/ModalContext/ModalContext";
import { PortfolioContext } from "../../context/PortfolioContext/PortfolioContext";
import "./CryptoInfo.styles.scss";

export const CryptoInfo: React.FC = () => {
  const { crypto } = useParams();

  const { setAddCryptoModalOpened } = useContext(ModalContext);
  const { setSelectedCrypto } = useContext(PortfolioContext);

  const [chartDates, setChartDates] = useState<string[]>([""]);
  const [chartPrices, setChartPrices] = useState<number[]>([0]);

  const [selectedTimePeriod, setSelectedTimePeriod] =
    useState<TimePeriods>("1d");

  const [assetInfo, setAssetInfo] = useState<
    RouterOutput["fetchAssetInfo"] | null
  >(null); // Info about the crypto

  const changeTimePeriod = (period: TimePeriods) => {
    setSelectedTimePeriod(period);
  };

  const timePeriods: TimePeriod[] = [
    { label: "1 Day", value: "1d" },
    { label: "1 Week", value: "1w" },
    { label: "1 Month", value: "1m" },
    { label: "3 Months", value: "3m" },
    { label: "6 Months", value: "6m" },
    { label: "1 Year", value: "1y" },
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
        onClick={() => changeTimePeriod(value)}
      >
        {label}
      </Button>
    );
  };

  const timePeriodButtons = timePeriods.map(generateTimePeriodButton);

  const loadPriceHistory = async (id: string) => {
    const priceHistoryData = await client.fetchPriceHistory.query({
      id: id,
      timePeriod: selectedTimePeriod,
    });

    setChartDates(
      priceHistoryData.map((d) => {
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

    setChartPrices(priceHistoryData.map((d) => parseFloat(d.priceUsd)));
  };

  const loadAssetInfo = async () => {
    if (crypto) {
      const assetInfo = await client.fetchAssetInfo.query({ id: crypto });

      assetInfo.priceUsd = formatNumber(assetInfo.priceUsd, "fixed");
      assetInfo.changePercent24Hr = formatNumber(
        assetInfo.changePercent24Hr,
        "fixed"
      );
      assetInfo.maxSupply = formatNumber(assetInfo.maxSupply, "abbreviate");
      assetInfo.vwap24Hr = formatNumber(assetInfo.vwap24Hr, "abbreviate");
      assetInfo.marketCapUsd = formatNumber(
        assetInfo.marketCapUsd,
        "abbreviate"
      );
      assetInfo.volumeUsd24Hr = formatNumber(
        assetInfo.volumeUsd24Hr,
        "abbreviate"
      );
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

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="crypto-info">
      {assetInfo ? (
        <>
          <div className="crypto-info__header">
            <div className="crypto-info__header__asset">
              <div className="crypto-info__header__asset__icon">
                <img src={assetInfo ? getCryptoLogo(assetInfo?.symbol) : ""} />
              </div>
              <div className="crypto-info__header__asset__main">
                <div
                  className="crypto-info__header__asset__main__name"
                  data-testid="crypto-info_header_name"
                >
                  {assetInfo?.name || "..."} ({assetInfo?.symbol || "..."})
                </div>
                <div className="crypto-info__header__asset__main__date">
                  {formattedDate}
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
                  <span>VOLUME (24HR)</span> $
                  {assetInfo?.volumeUsd24Hr || "..."}
                </div>
              </div>
              <div className="crypto-info__header__stats__col crypto-info__header__stats__col--add-button">
                <Button
                  testId="crypto-info_add-crypto-button"
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
            <div
              className="crypto-info__body__price-chart"
              data-testid="crypto-info_price-chart"
            >
              <PriceChart
                labels={chartDates}
                data={chartPrices}
                isChangePositive={true}
              />
            </div>
            <div className="crypto-info__body__controls">
              {timePeriodButtons}
            </div>
          </div>
        </>
      ) : (
        <div className="flex jcc aic">Loading...</div>
      )}
    </div>
  );
};
