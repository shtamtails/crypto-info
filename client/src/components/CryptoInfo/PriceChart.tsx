import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

export interface PriceChartProps {
  data: number[];
  labels: string[];
  isChangePositive: boolean;
}

export type TimePeriods = "1d" | "1w" | "1m" | "3m" | "6m" | "1y";
export type TimePeriod = { label: string; value: TimePeriods };

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const PriceChart: React.FC<PriceChartProps> = (props) => {
  const { isChangePositive } = props;

  const options = {
    responsive: true,
    plugins: {},
  };

  const labels = props.labels;

  const chartFillPositiveColor = "#69db7c";
  const chartStrokePositiveColor = "#40c057";
  const chartFillNegativeColor = "#ff8787";
  const chartStoreNegativeColor = "#fa5252";

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Price",
        data: props.data,
        borderColor: `${
          isChangePositive ? chartStrokePositiveColor : chartStoreNegativeColor
        }`,
        backgroundColor: `${
          isChangePositive ? chartFillPositiveColor : chartFillNegativeColor
        }`,
      },
    ],
  };

  return <Line options={options} data={data} />;
};
