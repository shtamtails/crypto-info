import { createContext, useState } from "react";
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
  setSelectedCrypto: () => {},
  setPortfolioModalOpened: () => {},
  setAddCryptoModalOpened: () => {},
  setPortfolio: () => {},
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

  return (
    <PortfolioContext.Provider
      value={{
        selectedCrypto,
        portfolio,
        portfolioModalOpened,
        addCryptoModalOpened,
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

// TODO REFACTOR IT TO HANDLE MULTIPLE DIFFERENT MODALS
