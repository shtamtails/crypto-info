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

export interface Rates {
  id: string;
  symbol: string;
  currencySymbol: string;
  type: string;
  rateUsd: string;
}

export type PriceData = {
  priceUsd: string;
  time: number;
};
