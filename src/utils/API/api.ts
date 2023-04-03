import axios from "axios";
import { IAssets, IPriceHistory, PriceData, timePeriods } from "./types";

export const api = axios.create({
  baseURL: "https://api.coincap.io/v2",
});

export const fetchAssets = async (limit: number, offset: number) => {
  const response = await api.get(`/assets?limit=${limit}&offset=${offset}`);
  const data: IAssets = response.data;
  return data.data;
};

export const fetchPriceHistory = async (symbol: string, timePeriod: timePeriods): Promise<PriceData[]> => {
  let interval = "h1";
  const now = new Date();
  const startDate = new Date();
  switch (timePeriod) {
    case "1d":
      startDate.setDate(now.getDate() - 1);
      break;
    case "1w":
      startDate.setDate(now.getDate() - 7);
      break;
    case "1m":
      interval = "h6";
      startDate.setMonth(now.getMonth() - 1);
      break;
    case "3m":
      interval = "d1";
      startDate.setMonth(now.getMonth() - 3);
      break;
    case "6m":
      interval = "d1";
      startDate.setMonth(now.getMonth() - 6);
      break;
    case "1y":
      interval = "d1";
      startDate.setFullYear(now.getFullYear() - 1);
      break;
  }
  const response = await api.get(
    `/assets/${symbol}/history?interval=${interval}&start=${startDate.valueOf()}&end=${now.valueOf()}`
  );
  const data: IPriceHistory = response.data;
  return data.data;
};
