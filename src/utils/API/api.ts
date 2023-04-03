import axios from "axios";
import { IAssets, IAsset, PriceData, TimePeriods, AssetData } from "./types";

export const api = axios.create({
  baseURL: "https://api.coincap.io/v2",
});

export const fetchData = async <T>(endpoint: string, params?: Record<string, any>): Promise<T> => {
  const response = await api.get(endpoint, { params });
  return response.data.data;
};

export const fetchAssets = async (limit: number, offset: number) => {
  const data = await fetchData<AssetData[]>("/assets", { limit, offset });
  return data;
};

export const fetchAssetInfo = async (asset: string) => {
  const data = await fetchData<AssetData>(`/assets/${asset}`);
  return data;
};

export const fetchPriceHistory = async (symbol: string, timePeriod: TimePeriods): Promise<PriceData[]> => {
  let interval = "h1";
  const now = new Date();
  const startDate = new Date();
  switch (timePeriod) {
    case TimePeriods.ONE_DAY:
      startDate.setDate(now.getDate() - 1);
      break;
    case TimePeriods.ONE_WEEK:
      startDate.setDate(now.getDate() - 7);
      break;
    case TimePeriods.ONE_MONTH:
      interval = "h6";
      startDate.setMonth(now.getMonth() - 1);
      break;
    case TimePeriods.THREE_MONTHS:
      interval = "d1";
      startDate.setMonth(now.getMonth() - 3);
      break;
    case TimePeriods.SIX_MONTHS:
      interval = "d1";
      startDate.setMonth(now.getMonth() - 6);
      break;
    case TimePeriods.ONE_YEAR:
      interval = "d1";
      startDate.setFullYear(now.getFullYear() - 1);
      break;
  }
  const data = await fetchData<PriceData[]>(`/assets/${symbol}/history`, {
    interval,
    start: startDate.valueOf(),
    end: now.valueOf(),
  });
  return data.map((item) => ({ priceUsd: item.priceUsd, time: item.time }));
};

export const getCryptoLogo = (symbol: string) => {
  return `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;
};
