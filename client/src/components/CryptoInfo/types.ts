export interface PriceChartProps {
  data: number[];
  labels: string[];
  isChangePositive: boolean;
}

export type TimePeriods = "1d" | "1w" | "1m" | "3m" | "6m" | "1y";
export type TimePeriod = { label: string; value: TimePeriods };
