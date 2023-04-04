export type IPortfolio = {
  name: string;
  id: string;
  symbol: string;
  amount: number;
  priceUsd: number;
  newPriceUsd?: number;
};
export type ISelectedCrypto = { name: string; id: string; symbol: string };

export interface DefaultContextProps {
  selectedCrypto: ISelectedCrypto;
  portfolio: IPortfolio[] | null;
  portfolioModalOpened: boolean;
  addCryptoModalOpened: boolean;
  setSelectedCrypto: (arg0: ISelectedCrypto) => void;
  setPortfolioModalOpened: (arg0: boolean) => void;
  setAddCryptoModalOpened: (arg0: boolean) => void;
  setPortfolio: (arg0: IPortfolio[]) => void;
}

export interface ContextProviderProps {
  children: React.ReactNode;
}
