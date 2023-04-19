import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import axios from "axios";
import { AssetData, PriceData, Rates } from "./types";
import { TRPCError } from "@trpc/server";

export const fetchData = async <T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<T> => {
  const response = await axios.get(`https://api.coincap.io/v2${endpoint}`, {
    params,
  });
  return response.data.data;
};

export const appRouter = router({
  fetchAssets: publicProcedure
    .input(z.object({ limit: z.number(), offset: z.number() }))
    .query(async ({ input }) => {
      try {
        const data = await fetchData<AssetData[]>("/assets", {
          limit: input.limit,
          offset: input.offset,
        });
        return data;
      } catch (err) {
        console.error(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching assets",
        });
      }
    }),

  fetchAssetInfo: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const data = await fetchData<AssetData>(`/assets/${input.id}`);
        return data;
      } catch (err) {
        console.error("Error fetching Asset Info");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching asset info",
        });
      }
    }),

  fetchRates: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const data = await fetchData<Rates>(`/rates/${input.id}`);
        return data;
      } catch (err) {
        console.error(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching rates",
        });
      }
    }),
  fetchPriceHistory: publicProcedure
    .input(
      z.object({
        id: z.string(),
        timePeriod: z.enum(["1d", "1w", "1m", "3m", "6m", "1y"]),
      })
    )
    .query(async ({ input }) => {
      let interval = "h1";
      const now = new Date();
      const startDate = new Date();
      switch (input.timePeriod) {
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
      try {
        const data = await fetchData<PriceData[]>(
          `/assets/${input.id}/history`,
          {
            interval,
            start: startDate.valueOf(),
            end: now.valueOf(),
          }
        );
        return data.map((item) => ({
          priceUsd: item.priceUsd,
          time: item.time,
        }));
      } catch (err) {
        console.error(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching rates",
        });
      }
    }),
  getCryptoLogo: publicProcedure
    .input(z.object({ symbol: z.string() }))
    .query(async ({ input }) => {
      return `https://assets.coincap.io/assets/icons/${input.symbol.toLowerCase()}@2x.png`;
    }),
});

export type AppRouter = typeof appRouter;
