export interface PortfolioModalProps {
  isVisible: boolean;
  setIsVisible: (arg0: boolean) => void;
}

export interface PortfolioModalElementProps {
  name: string;
  amount: string | number;
  priceUsd: string | number;
  id: string;
  symbol: string;
}
