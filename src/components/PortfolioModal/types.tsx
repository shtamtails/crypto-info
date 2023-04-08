export interface PortfolioModalProps {
  isVisible: boolean;
  setIsVisible: (arg0: boolean) => void;
}

export interface PortfolioModalElementProps {
  name: string;
  amount: number;
  priceUsd: string | number;
  id: string;
  symbol: string;
  number: number;
  oldPriceUsd: number;
}
