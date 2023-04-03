import axios from "axios";
import { IAssets } from "./types";

export const api = axios.create({
  baseURL: "https://api.coincap.io/v2",
});

export const fetchAssets = async (limit: number, offset: number) => {
  const response = await api.get(`/assets?limit=${limit}&offset=${offset}`);
  const data: IAssets = response.data;
  return data;
};
