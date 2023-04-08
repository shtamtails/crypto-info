import { createContext, useEffect, useState } from "react";
import { ContextProviderProps, EditCryptoContextProps } from "./types";

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

export const EditCryptoContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [editCryptoModalOpened, setEditCryptoModalOpened] =
    useState<boolean>(false);
  const [editCryptoAmount, setEditCryptoAmount] = useState<string>("");
  const [editCryptoAmountError, setEditCryptoAmountError] =
    useState<string>("");
  const [editCryptoAmountId, setEditCryptoAmountId] = useState<string>("");

  useEffect(() => {
    console.log(editCryptoModalOpened);
  }, [editCryptoModalOpened]);
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
