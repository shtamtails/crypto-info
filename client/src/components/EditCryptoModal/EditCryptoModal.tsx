import { useContext, useEffect } from "react";
import { IPortfolio, PortfolioContext } from "../../context";
import { Button } from "../../reusable/Button";
import { Input } from "../../reusable/Input";
import { Modal } from "../../reusable/Modal";
import { EditCryptoContext } from "../../context/EditCryptoContext";
import { BiCoin } from "react-icons/bi";
import { getCryptoLogo } from "../../utils/API/api";
import { CryptoCard } from "../../reusable/CryptoCard";
import { client } from "../../utils/tRPC";
import "./EditCryptoModal.styles.scss";

export const EditCryptoModal = () => {
  const { portfolio, setPortfolio, setNewPortfolioSum, selectedCrypto } =
    useContext(PortfolioContext);
  const {
    editCryptoAmount: amount,
    editCryptoAmountError: error,
    editCryptoModalOpened: isVisible,
    setEditCryptoAmount: setAmount,
    setEditCryptoAmountError: setAmountError,
    setEditCryptoModalOpened: setIsVisible,
    editCryptoAmountId: id,
  } = useContext(EditCryptoContext);

  const handleEditSubmit = async () => {
    if (!amount || +amount < 0 || !portfolio) {
      setAmountError("Wrong coin amount!");
      return;
    }

    const { priceUsd = 0 } = await client.fetchAssetInfo.query({ id }); // Get price in USD of 1 coin
    const newPriceUsd = +amount * +priceUsd;

    const selectedCryptoIndex = portfolio.findIndex(
      (crypto: IPortfolio) => crypto.id === id
    );

    portfolio[selectedCryptoIndex].amount = +amount;
    portfolio[selectedCryptoIndex].priceUsd = newPriceUsd;

    localStorage.setItem("portfolio", JSON.stringify(portfolio));
    setPortfolio(portfolio);

    const newOverallSum =
      portfolio && portfolio.reduce((sum, crypto) => sum + crypto.priceUsd, 0);
    newOverallSum && setNewPortfolioSum(newOverallSum);

    setIsVisible(false);
  };

  const handleDeleteCrypto = () => {
    if (
      window.confirm("Are you sure you want to delete this cryptocurrency?")
    ) {
      const updatedPortfolio = portfolio?.filter((el) => el.id !== id);
      localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
      updatedPortfolio && setPortfolio(updatedPortfolio);
      const newOverallSum = updatedPortfolio?.reduce(
        (sum, { priceUsd = 0 }) => sum + priceUsd,
        0
      );
      setNewPortfolioSum(newOverallSum || 0);
      setIsVisible(false);
    }
  };

  useEffect(() => {
    setAmountError("");
  }, []);

  return (
    <Modal
      width={500}
      zIndex={10000}
      visible={isVisible}
      setVisible={setIsVisible}
      title="Edit crypto"
      className="edit-crypto-modal"
      testId="edit-crypto-modal"
    >
      <div className="edit-crypto-modal__container">
        <div className="edit-crypto-modal__container__crypto-card">
          <CryptoCard
            logoURL={getCryptoLogo(selectedCrypto.symbol)}
            name={selectedCrypto.name}
            shortName={selectedCrypto.symbol}
          />
        </div>

        <Input
          icon={<BiCoin />}
          fullWidth
          value={amount}
          setValue={setAmount}
          label="Edit amount"
          type="number"
          error={error}
        />

        <Button variant="regular" mt="lg" fullWidth onClick={handleEditSubmit}>
          Submit
        </Button>
        <Button variant="danger" mt="lg" fullWidth onClick={handleDeleteCrypto}>
          Delete from portfolio
        </Button>
      </div>
    </Modal>
  );
};
