import { createContext, useState } from "react";

export type IPortfolio = {
  name: string;
  id: string;
  symbol: string;
  amount: number;
  priceUsd: number;
  oldPriceUsd: number;
};

export type ISelectedCrypto = { name: string; id: string; symbol: string };

export interface PortfolioContextProps {
  selectedCrypto: ISelectedCrypto;
  portfolio: IPortfolio[] | null;
  portfolioModalOpened: boolean;
  addCryptoModalOpened: boolean;
  portfolioSum: number;
  newPortfolioSum: number;
  setPortfolioSum: (arg0: number) => void;
  setNewPortfolioSum: (arg0: number) => void;
  setPortfolioModalOpened: (arg0: boolean) => void;
  setAddCryptoModalOpened: (arg0: boolean) => void;
  setSelectedCrypto: (arg0: ISelectedCrypto) => void;
  setPortfolio: (arg0: IPortfolio[]) => void;
}

export const PortfolioContext = createContext<PortfolioContextProps>({
  selectedCrypto: { name: "", id: "", symbol: "" },
  portfolio: null,
  portfolioModalOpened: false,
  addCryptoModalOpened: false,
  portfolioSum: 0,
  newPortfolioSum: 0,
  setSelectedCrypto: () => {},
  setPortfolioModalOpened: () => {},
  setAddCryptoModalOpened: () => {},
  setPortfolio: () => {},
  setPortfolioSum: () => {},
  setNewPortfolioSum: () => {},
});

interface PortfolioContextProviderProps {
  children: React.ReactNode;
}

export const PortfolioContextProvider: React.FC<
  PortfolioContextProviderProps
> = ({ children }) => {
  const [portfolioModalOpened, setPortfolioModalOpened] =
    useState<boolean>(false);
  const [addCryptoModalOpened, setAddCryptoModalOpened] =
    useState<boolean>(false);

  const [selectedCrypto, setSelectedCrypto] = useState<ISelectedCrypto>({
    name: "",
    id: "",
    symbol: "",
  });
  const [portfolio, setPortfolio] = useState<IPortfolio[] | null>(null);

  const [portfolioSum, setPortfolioSum] = useState<number>(0);
  const [newPortfolioSum, setNewPortfolioSum] = useState<number>(0);

  return (
    <PortfolioContext.Provider
      value={{
        portfolioSum,
        newPortfolioSum,
        selectedCrypto,
        portfolio,
        portfolioModalOpened,
        addCryptoModalOpened,
        setNewPortfolioSum,
        setPortfolioSum,
        setSelectedCrypto,
        setAddCryptoModalOpened,
        setPortfolioModalOpened,
        setPortfolio,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
