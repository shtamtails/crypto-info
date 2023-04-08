export type IPortfolio = {
  name: string;
  id: string;
  symbol: string;
  amount: number;
  priceUsd: number;
  newPriceUsd?: number;
};
export type ISelectedCrypto = { name: string; id: string; symbol: string };

export interface PortfolioContextProps {
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

export interface EditCryptoContextProps {
  editCryptoModalOpened: boolean;
  setEditCryptoModalOpened: (arg0: boolean) => void;
  editCryptoAmount: string;
  setEditCryptoAmount: (arg0: string) => void;
  editCryptoAmountError: string;
  setEditCryptoAmountError: (arg0: string) => void;
  editCryptoAmountId: string;
  setEditCryptoAmountId: (arg0: string) => void;
}
