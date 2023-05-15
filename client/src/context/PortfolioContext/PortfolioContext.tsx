import { createContext, useState, ReactNode } from "react";

export interface PortfolioElement {
  name: string;
  id: string;
  symbol: string;
  amount: number;
  oldPriceUSD: number;
  newPriceUSD: number;
}

export interface Portfolio {
  items: PortfolioElement[];
  oldOverallSum: number;
  newOverallSum: number;
}

export type SelectedCrypto = { name: string; id: string; symbol: string };

interface PortfolioContextProps {
  selectedCrypto: SelectedCrypto | null;
  portfolio: Portfolio;
  setSelectedCrypto: (value: SelectedCrypto) => void;
  setPortfolio: (value: Portfolio) => void;
}

export const PortfolioContext = createContext<PortfolioContextProps>({
  selectedCrypto: null,
  portfolio: {
    items: [],
    oldOverallSum: 0,
    newOverallSum: 0,
  },
  setSelectedCrypto: () => {
    throw new Error("setSelectedCrypto is not implemented");
  },
  setPortfolio: () => {
    throw new Error("setPortfolio is not implemented");
  },
});

export const PortfolioContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedCrypto, setSelectedCrypto] = useState<SelectedCrypto | null>(
    null
  );
  const [portfolio, setPortfolio] = useState<Portfolio>({
    items: [],
    oldOverallSum: 0,
    newOverallSum: 0,
  });

  const portfolioContext = {
    selectedCrypto,
    portfolio,
    setSelectedCrypto,
    setPortfolio,
  };

  return (
    <PortfolioContext.Provider value={portfolioContext}>
      {children}
    </PortfolioContext.Provider>
  );
};
