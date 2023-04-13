import { useContext, useEffect } from "react";
import { IPortfolio, PortfolioContext } from "../../context";
import { Button } from "../../reusable/Button";
import { Input } from "../../reusable/Input";
import { Modal } from "../../reusable/Modal";
import { EditCryptoContext } from "../../context/EditCryptoContext";
import { BiCoin } from "react-icons/bi";
import { fetchAssetInfo, getCryptoLogo } from "../../utils/API/api";
import { CryptoCard } from "../../reusable/CryptoCard";
import "./editCryptoModal.scss";

export const EditCryptoModal = () => {
  const { portfolio, setPortfolio, setNewPortfolioSum, selectedCrypto } =
    useContext(PortfolioContext);
  const {
    editCryptoAmount,
    editCryptoAmountError,
    editCryptoModalOpened,
    setEditCryptoAmount,
    setEditCryptoAmountError,
    setEditCryptoModalOpened,
    editCryptoAmountId,
  } = useContext(EditCryptoContext);

  const handleEditSubmit = async () => {
    const { priceUsd: currencyPriceUsd = 0 } = await fetchAssetInfo(
      editCryptoAmountId
    );
    const newPriceUsd = +editCryptoAmount * +currencyPriceUsd;

    if (editCryptoAmount && +editCryptoAmount > 0 && portfolio) {
      const updatedPortfolio = portfolio?.map((el) =>
        el.id === editCryptoAmountId
          ? {
              ...el,
              amount: +editCryptoAmount,
              priceUsd: newPriceUsd,
            }
          : el
      );
      localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
      updatedPortfolio && setPortfolio(updatedPortfolio);
      const newOverallSum = updatedPortfolio?.reduce(
        (sum, { priceUsd = 0 }) => sum + priceUsd,
        0
      );
      setNewPortfolioSum(newOverallSum || 0);
      setEditCryptoModalOpened(false);
    } else {
      setEditCryptoAmountError("Wrong coin amount!");
    }
  };

  const handleDeleteCrypto = () => {
    if (
      window.confirm("Are you sure you want to delete this cryptocurrency?")
    ) {
      const updatedPortfolio = portfolio?.filter(
        (el) => el.id !== editCryptoAmountId
      );
      localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
      updatedPortfolio && setPortfolio(updatedPortfolio);
      const newOverallSum = updatedPortfolio?.reduce(
        (sum, { priceUsd = 0 }) => sum + priceUsd,
        0
      );
      setNewPortfolioSum(newOverallSum || 0);
      setEditCryptoModalOpened(false);
    }
  };

  useEffect(() => {
    setEditCryptoAmountError("");
  }, []);

  return (
    <Modal
      width={500}
      zIndex={10000}
      visible={editCryptoModalOpened}
      setVisible={setEditCryptoModalOpened}
      title="Edit crypto"
      className="edit-crypto-modal"
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
          value={editCryptoAmount}
          setValue={setEditCryptoAmount}
          label="Edit amount"
          type="number"
          error={editCryptoAmountError}
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
