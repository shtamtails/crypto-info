import { createContext, useState } from "react";

interface ModalContextProps {
  portfolioModalOpened: boolean;
  addCryptoModalOpened: boolean;
  setPortfolioModalOpened: (arg0: boolean) => void;
  setAddCryptoModalOpened: (arg0: boolean) => void;
}

export const ModalContext = createContext<ModalContextProps>({
  portfolioModalOpened: false,
  addCryptoModalOpened: false,
  setPortfolioModalOpened: () => {},
  setAddCryptoModalOpened: () => {},
});

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [portfolioModalOpened, setPortfolioModalOpened] = useState<boolean>(false);
  const [addCryptoModalOpened, setAddCryptoModalOpened] = useState<boolean>(false);

  return (
    <ModalContext.Provider
      value={{ portfolioModalOpened, addCryptoModalOpened, setAddCryptoModalOpened, setPortfolioModalOpened }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// TODO REFACTOR IT TO HANDLE MULTIPLE DIFFERENT MODALS
