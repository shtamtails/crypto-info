export interface AssetData {
  changePercent24Hr: string;
  explorer: string;
  id: string;
  marketCapUsd: string;
  maxSupply: string;
  name: string;
  priceUsd: string;
  rank: string;
  supply: string;
  symbol: string;
  volumeUsd24Hr: string;
  vwap24Hr: string;
}

export interface IAsset {
  data: AssetData;
  timestamp: number;
}

export interface IAssets {
  data: AssetData[];
  timestamp: number;
}

export type timePeriods = "1d" | "1w" | "1m" | "3m" | "6m" | "1y";

export type PriceData = {
  priceUsd: string;
  time: number;
};

export type IPriceHistory = {
  data: PriceData[];
};
