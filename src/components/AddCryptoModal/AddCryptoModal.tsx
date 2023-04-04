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

  const { selectedCrypto, setPortfolio, setAddCryptoModalOpened } = useContext(DefaultContext);

  const handleAddCrypto = async () => {
    const amount = amountRef.current?.value; // Take Input field value from ref
    // const { rateUsd } = await fetchRates(selectedCrypto?.id);  // fetchRates doesn't work for usd-coin, so we have to use /assets/$id
    const { priceUsd } = await fetchAssetInfo(selectedCrypto?.id); // get current USD price from asset info
    const portfolioData = localStorage.getItem("portfolio"); // Read "Portfolio" field from localstorage
    if (amount) {
      // If input field is not empty
      if (portfolioData) {
        // If portfolio field exists in localstorage
        const portfolio: IPortfolio[] = JSON.parse(portfolioData); // Transform it to Array
        const portfolioSelectedCrypto = portfolio.filter(
          (crypto) => crypto.name.toLowerCase() === selectedCrypto?.name.toLowerCase()
        )[0]; // Find slelectedCrypto in an array
        if (portfolioSelectedCrypto) {
          // If found  - change amount and price USD
          portfolioSelectedCrypto.amount += +amount;
          portfolioSelectedCrypto.priceUsd += +priceUsd * +amount;
        } else {
          // If selected crypto is not found - create one
          portfolio.push({
            name: selectedCrypto?.name || "",
            id: selectedCrypto?.id || "",
            symbol: selectedCrypto?.symbol || "",
            amount: +amount,
            priceUsd: +priceUsd * +amount,
          });
        }
        localStorage.setItem("portfolio", JSON.stringify(portfolio)); // Write it to localStorage
        setPortfolio(portfolio); // update the state
      } else {
        // If portfolio field is not found in localstorage - we create a new one
        const portfolio = [
          {
            name: selectedCrypto?.name || "",
            id: selectedCrypto?.id || "",
            symbol: selectedCrypto?.symbol || "",
            amount: +amount,
            priceUsd: +priceUsd * +amount,
          },
        ];
        localStorage.setItem("portfolio", JSON.stringify(portfolio)); // write to localstorage
        setPortfolio(portfolio); // update the state
      }
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
