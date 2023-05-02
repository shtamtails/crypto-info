// import axios from "axios";
// import { PriceData, AssetData, Rates } from "./types";

// export const api = axios.create({
//   baseURL: "https://api.coincap.io/v2",
// });

// export const fetchData = async <T>(
//   endpoint: string,
//   params?: Record<string, any>
// ): Promise<T> => {
//   const response = await axios.get(`https://api.coincap.io/v2${endpoint}`, {
//     params,
//   });
//   return response.data.data;
// };

// export const fetchAssets = async (limit: number, offset: number) => {
//   const data = await fetchData<AssetData[]>("/assets", { limit, offset });
//   return data;
// };

// export const fetchAssetInfo = async (id: string) => {
//   const data = await fetchData<AssetData>(`/assets/${id}`);
//   return data;
// };

// // /rates/$id for some reason doesn't work for usd-coin, so we have to use /assets/$id
// export const fetchRates = async (id: string) => {
//   const data = await fetchData<Rates>(`/rates/${id}`);
//   return data;
// };

export const getCryptoLogo = (symbol: string) => {
  return `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;
};
