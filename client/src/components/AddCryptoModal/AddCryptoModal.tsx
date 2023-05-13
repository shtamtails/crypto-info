import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../../reusable/Button";
import { Input } from "../../reusable/Input";
import { Modal, ModalDefaultProps } from "../../reusable/Modal";
import { CryptoCard } from "../../reusable/CryptoCard";
import { getCryptoLogo } from "../../utils/API";
import { PortfolioContext, IPortfolio, ISelectedCrypto } from "../../context";
import { BiCoin } from "react-icons/bi";
import { client } from "../../utils/tRPC";
import "./AddCryptoModal.styles.scss";

export const AddCryptoModal: React.FC<ModalDefaultProps> = ({
  visible,
  setVisible,
}) => {
  const {
    selectedCrypto = {} as ISelectedCrypto,
    setPortfolio,
    setAddCryptoModalOpened,
    setNewPortfolioSum,
  } = useContext(PortfolioContext);
  const amountRef = useRef<HTMLInputElement>(null);
  const [amountError, setAmountError] = useState<string>("");

  const handleAddCrypto = async () => {
    const amount = amountRef.current ? +amountRef.current.value : 0;

    if (!amount || amount <= 0) {
      setAmountError("Wrong coin amount!");
      return;
    }

    const { id = "", name = "", symbol = "" } = selectedCrypto;

    // Fetch general information about the cryptocurrency from API
    const assetInfo = await client.fetchAssetInfo.query({
      id: selectedCrypto.id,
    });

    // Get current portfolio data from localStorage
    const portfolioData = localStorage.getItem("portfolio");
    const portfolio: IPortfolio[] = portfolioData
      ? JSON.parse(portfolioData)
      : [];

    const selectedCryptoIndex = portfolio.findIndex(
      (crypto: IPortfolio) => crypto.name.toLowerCase() === name.toLowerCase()
    );

    const currentAmount =
      selectedCryptoIndex !== -1 ? +portfolio[selectedCryptoIndex].amount : 0;
    const newPriceUsd = +assetInfo.priceUsd * (amount + currentAmount);

    // check if selected crypto already exists in portfolio
    if (selectedCryptoIndex !== -1) {
      // change amount and price if exists
      portfolio[selectedCryptoIndex].amount += amount;
      portfolio[selectedCryptoIndex].priceUsd = newPriceUsd;
    } else {
      // create a new one if does not exist
      portfolio.push({
        name,
        id,
        symbol,
        amount,
        priceUsd: newPriceUsd,
        oldPriceUsd: newPriceUsd,
      });
    }

    localStorage.setItem("portfolio", JSON.stringify(portfolio));
    setPortfolio(portfolio);

    // Get the sum of all coins is USD and update the state
    const newOverallSum = portfolio.reduce(
      (sum, crypto) => sum + crypto.priceUsd,
      0
    );
    setNewPortfolioSum(newOverallSum);

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
