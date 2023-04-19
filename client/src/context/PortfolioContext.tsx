import { createContext, useEffect, useState } from "react";
import {
  PortfolioContextProps,
  ContextProviderProps,
  ISelectedCrypto,
  IPortfolio,
} from "./types";

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

export const PortfolioContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
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
