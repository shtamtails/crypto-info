import { useContext, useRef } from "react";
import { Button } from "../../reusable/Button";
import { Input } from "../../reusable/Input";
import { Modal } from "../../reusable/Modal";
import { AddCryptoModalProps } from "./types";
import "./addCryptoModal.scss";
import { CryptoCard } from "../../reusable/CryptoCard";
import { getCryptoLogo } from "../../utils/API";
import { fetchAssetInfo } from "../../utils/API/api";
import { DefaultContext, IPortfolio } from "../../context";

export const AddCryptoModal: React.FC<AddCryptoModalProps> = ({ visible, setVisible }) => {
  const amountRef = useRef<HTMLInputElement>(null);

  const { selectedCrypto, setPortfolio } = useContext(DefaultContext);

  const handleAddCrypto = async () => {
    const amount = amountRef.current?.value;
    const { priceUsd } = await fetchAssetInfo(selectedCrypto?.id);
    // const { rateUsd } = await fetchRates(selectedCrypto?.id);
    const portfolioData = localStorage.getItem("portfolio");
    if (amount) {
      if (portfolioData) {
        const portfolio: IPortfolio[] = JSON.parse(portfolioData);
        const portfolioSelectedCrypto = portfolio.filter(
          (crypto) => crypto.name.toLowerCase() === selectedCrypto?.name.toLowerCase()
        )[0];
        if (portfolioSelectedCrypto) {
          portfolioSelectedCrypto.amount += +amount;
          portfolioSelectedCrypto.priceUsd += +priceUsd * +amount;
        } else {
          portfolio.push({
            name: selectedCrypto?.name || "",
            id: selectedCrypto?.id || "",
            symbol: selectedCrypto?.symbol || "",
            amount: +amount,
            priceUsd: +priceUsd * +amount,
          });
        }
        localStorage.setItem("portfolio", JSON.stringify(portfolio));
        setPortfolio(portfolio);
      } else {
        const portfolio = [
          {
            name: selectedCrypto?.name || "",
            id: selectedCrypto?.id || "",
            symbol: selectedCrypto?.symbol || "",
            amount: +amount,
            priceUsd: +priceUsd * +amount,
          },
        ];
        localStorage.setItem("portfolio", JSON.stringify(portfolio));
        setPortfolio(portfolio);
      }
    }
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
