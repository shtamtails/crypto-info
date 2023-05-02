export type IPortfolio = {
  name: string;
  id: string;
  symbol: string;
  amount: number;
  priceUsd: number;
  oldPriceUsd: number;
};

export type ISelectedCrypto = { name: string; id: string; symbol: string };

type VoidFuncWithArg<T> = (arg0: T) => void;

export interface PortfolioContextProps {
  selectedCrypto: ISelectedCrypto;
  portfolio: IPortfolio[] | null;
  portfolioModalOpened: boolean;
  addCryptoModalOpened: boolean;
  portfolioSum: number;
  newPortfolioSum: number;
  setPortfolioSum: VoidFuncWithArg<number>;
  setNewPortfolioSum: VoidFuncWithArg<number>;
  setPortfolioModalOpened: VoidFuncWithArg<boolean>;
  setAddCryptoModalOpened: VoidFuncWithArg<boolean>;
  setSelectedCrypto: (arg0: ISelectedCrypto) => void;
  setPortfolio: (arg0: IPortfolio[]) => void;
}

export interface ContextProviderProps {
  children: React.ReactNode;
}

export interface EditCryptoContextProps {
  editCryptoModalOpened: boolean;
  setEditCryptoModalOpened: VoidFuncWithArg<boolean>;
  setEditCryptoAmount: VoidFuncWithArg<string>;
  setEditCryptoAmountError: VoidFuncWithArg<string>;
  setEditCryptoAmountId: VoidFuncWithArg<string>;
  editCryptoAmount: string;
  editCryptoAmountError: string;
  editCryptoAmountId: string;
}
