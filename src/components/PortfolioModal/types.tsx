export interface PortfioModalProps {
  isVisible: boolean;
  setIsVisible: (arg0: boolean) => void;
}

export interface PortfioModalElementProps {
  name: string;
  amount: string | number;
  priceUsd: string | number;
  id: string;
  symbol: string;
}
