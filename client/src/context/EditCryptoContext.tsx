import { createContext, useState } from "react";

export interface EditCryptoContextProps {
  editCryptoModalOpened: boolean;
  setEditCryptoModalOpened: (arg0: boolean) => void;
  setEditCryptoAmount: (arg0: string) => void;
  setEditCryptoAmountError: (arg0: string) => void;
  setEditCryptoAmountId: (arg0: string) => void;
  editCryptoAmount: string;
  editCryptoAmountError: string;
  editCryptoAmountId: string;
}

export const EditCryptoContext = createContext<EditCryptoContextProps>({
  editCryptoModalOpened: false,
  setEditCryptoModalOpened: () => {},
  editCryptoAmount: "",
  setEditCryptoAmount: () => {},
  editCryptoAmountError: "",
  setEditCryptoAmountError: () => {},
  editCryptoAmountId: "",
  setEditCryptoAmountId: () => {},
});

interface EditCryptoContextProviderProps {
  children: React.ReactNode;
}

export const EditCryptoContextProvider: React.FC<
  EditCryptoContextProviderProps
> = ({ children }) => {
  const [editCryptoModalOpened, setEditCryptoModalOpened] =
    useState<boolean>(false);
  const [editCryptoAmount, setEditCryptoAmount] = useState<string>("");
  const [editCryptoAmountError, setEditCryptoAmountError] =
    useState<string>("");
  const [editCryptoAmountId, setEditCryptoAmountId] = useState<string>("");

  return (
    <EditCryptoContext.Provider
      value={{
        editCryptoModalOpened,
        setEditCryptoModalOpened,
        editCryptoAmount,
        setEditCryptoAmount,
        editCryptoAmountError,
        setEditCryptoAmountError,
        editCryptoAmountId,
        setEditCryptoAmountId,
      }}
    >
      {children}
    </EditCryptoContext.Provider>
  );
};
