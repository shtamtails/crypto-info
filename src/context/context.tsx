import { createContext, useState } from "react";
import {
  DefaultContextProps,
  ContextProviderProps,
  ISelectedCrypto,
  IPortfolio,
} from "./types";

export const DefaultContext = createContext<DefaultContextProps>({
  selectedCrypto: { name: "", id: "", symbol: "" },
  portfolio: null,
  portfolioModalOpened: false,
  addCryptoModalOpened: false,
  setSelectedCrypto: () => {},
  setPortfolioModalOpened: () => {},
  setAddCryptoModalOpened: () => {},
  setPortfolio: () => {},
});

export const ContextProvider: React.FC<ContextProviderProps> = ({
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
    <DefaultContext.Provider
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
    </DefaultContext.Provider>
  );
};

// TODO REFACTOR IT TO HANDLE MULTIPLE DIFFERENT MODALS
