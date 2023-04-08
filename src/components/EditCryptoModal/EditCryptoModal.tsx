import { useContext } from "react";
import { IPortfolio, PortfolioContext } from "../../context";
import { Button } from "../../reusable/Button";
import { Input } from "../../reusable/Input";
import { Modal } from "../../reusable/Modal";
import { EditCryptoContext } from "../../context/EditCryptoContext";
import "./editCryptoModal.scss";
import { BiCoin } from "react-icons/bi";
import { fetchAssetInfo } from "../../utils/API/api";

export const EditCryptoModal = () => {
  const { portfolio, setPortfolio, setNewPortfolioSum } =
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

  return (
    <Modal
      width={500}
      zIndex={10000}
      visible={editCryptoModalOpened}
      setVisible={setEditCryptoModalOpened}
      title="Edit crypto"
    >
      <div className="edit-crypto-modal__container">
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
