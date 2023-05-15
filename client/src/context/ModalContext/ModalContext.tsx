import { createContext, useState, ReactNode } from "react";

interface ModalContextProps {
  editCryptoModalOpened: boolean;
  portfolioModalOpened: boolean;
  addCryptoModalOpened: boolean;
  setEditCryptoModalOpened: (value: boolean) => void;
  setPortfolioModalOpened: (value: boolean) => void;
  setAddCryptoModalOpened: (value: boolean) => void;
}

export const ModalContext = createContext<ModalContextProps>({
  editCryptoModalOpened: false,
  portfolioModalOpened: false,
  addCryptoModalOpened: false,
  setEditCryptoModalOpened: () => {
    throw new Error("setEditCryptoModalOpened is not implemented");
  },
  setPortfolioModalOpened: () => {
    throw new Error("setPortfolioModalOpened is not implemented");
  },
  setAddCryptoModalOpened: () => {
    throw new Error("setAddCryptoModalOpened is not implemented");
  },
});

export const ModalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [editCryptoModalOpened, setEditCryptoModalOpened] = useState(false);
  const [portfolioModalOpened, setPortfolioModalOpened] = useState(false);
  const [addCryptoModalOpened, setAddCryptoModalOpened] = useState(false);

  const modalContext = {
    editCryptoModalOpened,
    portfolioModalOpened,
    addCryptoModalOpened,
    setEditCryptoModalOpened,
    setPortfolioModalOpened,
    setAddCryptoModalOpened,
  };

  return (
    <ModalContext.Provider value={modalContext}>
      {children}
    </ModalContext.Provider>
  );
};
