import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../../reusable/Button";
import { Input } from "../../reusable/Input";
import { Modal } from "../../reusable/Modal";
import { AddCryptoModalProps } from "./types";
import "./addCryptoModal.scss";
import { CryptoCard } from "../../reusable/CryptoCard";
import { getCryptoLogo } from "../../utils/API";
import { PortfolioContext, IPortfolio, ISelectedCrypto } from "../../context";
import { BiCoin } from "react-icons/bi";
import { client } from "../../utils/tRPC";

export const AddCryptoModal: React.FC<AddCryptoModalProps> = ({
  visible,
  setVisible,
}) => {
  const amountRef = useRef<HTMLInputElement>(null);

  const {
    selectedCrypto = {} as ISelectedCrypto,
    setPortfolio,
    setAddCryptoModalOpened,
    setNewPortfolioSum,
  } = useContext(PortfolioContext);

  const [amountError, setAmountError] = useState<string>("");

  const handleAddCrypto = async () => {
    const amount = amountRef.current?.value;
    const { id = "", name = "", symbol = "" } = selectedCrypto;
    const { priceUsd = 0 } = await client.fetchAssetInfo.query({ id: id });
    const portfolioData = localStorage.getItem("portfolio") ?? "[]";
    const portfolio: IPortfolio[] = JSON.parse(portfolioData);

    if (!amount || +amount <= 0) {
      setAmountError("Wrong coin amount!");
      return;
    }

    const selectedCryptoIndex = portfolio.findIndex(
      (crypto: IPortfolio) => crypto.name.toLowerCase() === name.toLowerCase()
    );
    const newPriceUsd =
      +priceUsd * (+amount + (portfolio[selectedCryptoIndex]?.amount || 0));

    const updatedPortfolio: IPortfolio[] =
      selectedCryptoIndex !== -1
        ? portfolio.map((crypto, index) =>
            index === selectedCryptoIndex
              ? {
                  ...crypto,
                  ...{
                    name,
                    id,
                    symbol,
                    amount: (crypto.amount += +amount),
                    priceUsd: newPriceUsd,
                  },
                }
              : crypto
          )
        : [
            ...portfolio,
            {
              name,
              id,
              symbol,
              amount: +amount,
              priceUsd: newPriceUsd,
              oldPriceUsd: newPriceUsd,
            },
          ];
    localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
    setPortfolio(updatedPortfolio);
    const newOverallSum =
      updatedPortfolio &&
      updatedPortfolio.reduce((sum, crypto) => sum + crypto.priceUsd, 0);
    newOverallSum && setNewPortfolioSum(newOverallSum);
    setAddCryptoModalOpened(false);
  };

  useEffect(() => {
    setAmountError("");
  }, []);

  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      title="Add crypto"
      className="add-crypto-modal"
      testId="add-crypto-modal"
    >
      <div className="add-crypto-modal__crypto-card">
        <CryptoCard
          logoURL={getCryptoLogo(selectedCrypto?.symbol || "")}
          name={selectedCrypto?.name || ""}
          shortName={selectedCrypto?.symbol || ""}
        />
      </div>

      <div className="add-crypto-modal__amount-input">
        <Input
          testId="add-crypto-modal_amount-input"
          icon={<BiCoin />}
          ref={amountRef}
          fullWidth
          label="Amount"
          placeholder="Amount"
          type="number"
          error={amountError}
        />
      </div>
      <div className="add-crypto-modal__confirm-button">
        <Button
          variant="regular"
          onClick={handleAddCrypto}
          fullWidth
          testId="add-crypto-modal_confirm"
        >
          Add
        </Button>
      </div>
    </Modal>
  );
};
