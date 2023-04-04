import { useContext, useRef } from "react";
import { Button } from "../../reusable/Button";
import { Input } from "../../reusable/Input";
import { Modal } from "../../reusable/Modal";
import { AddCryptoModalProps } from "./types";
import "./addCryptoModal.scss";
import { CryptoCard } from "../../reusable/CryptoCard";
import { getCryptoLogo } from "../../utils/API";
import { fetchAssetInfo } from "../../utils/API/api";
import { DefaultContext, IPortfolio, ISelectedCrypto } from "../../context";

export const AddCryptoModal: React.FC<AddCryptoModalProps> = ({ visible, setVisible }) => {
  const amountRef = useRef<HTMLInputElement>(null);

  const { selectedCrypto = {} as ISelectedCrypto, setPortfolio, setAddCryptoModalOpened } = useContext(DefaultContext);

  const handleAddCrypto = async () => {
    const amount = amountRef.current?.value;
    const { id = "", name = "", symbol = "" } = selectedCrypto;
    const { priceUsd = 0 } = await fetchAssetInfo(id);

    const portfolioData = localStorage.getItem("portfolio") ?? "[]";
    const portfolio: IPortfolio[] = JSON.parse(portfolioData);

    if (amount) {
      const newPriceUsd = +priceUsd * +amount;
      const selectedCryptoIndex = portfolio.findIndex(
        (crypto: IPortfolio) => crypto.name.toLowerCase() === name.toLowerCase()
      );
      const newPortfolio: IPortfolio[] =
        selectedCryptoIndex !== -1
          ? portfolio.map((crypto, index) =>
              index === selectedCryptoIndex
                ? { ...crypto, ...{ name, id, symbol, amount: (crypto.amount += +amount), priceUsd: newPriceUsd } }
                : crypto
            )
          : [...portfolio, { name, id, symbol, amount: +amount, priceUsd: newPriceUsd }];
      localStorage.setItem("portfolio", JSON.stringify(newPortfolio));
      setPortfolio(newPortfolio);
    }
    amount && setAddCryptoModalOpened(false);
  };

  return (
    <Modal visible={visible} setVisible={setVisible} title="Add crypto" className="add-crypto-modal">
      <CryptoCard
        logoURL={getCryptoLogo(selectedCrypto?.symbol || "")}
        name={selectedCrypto?.name || ""}
        shortName={selectedCrypto?.symbol || ""}
      />
      <div className="add-crypto-modal-amount-input">
        <Input ref={amountRef} fullWidth label="Amount" placeholder="Amount" />
      </div>
      <Button fullWidth variant="regular" onClick={handleAddCrypto}>
        Add
      </Button>
    </Modal>
  );
};
