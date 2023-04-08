import { useContext } from "react";
import { PortfolioContext } from "../../context";
import { Button } from "../../reusable/Button";
import { Input } from "../../reusable/Input";
import { Modal } from "../../reusable/Modal";
import { EditCryptoContext } from "../../context/EditCryptoContext";
import "./editCryptoModal.scss";

export const EditCryptoModal = () => {
  const { portfolio, setPortfolio } = useContext(PortfolioContext);
  const {
    editCryptoAmount,
    editCryptoAmountError,
    editCryptoModalOpened,
    setEditCryptoAmount,
    setEditCryptoAmountError,
    setEditCryptoModalOpened,
    editCryptoAmountId,
  } = useContext(EditCryptoContext);

  const handleEditSubmit = () => {
    if (editCryptoAmount && +editCryptoAmount > 0) {
      const updatedPortfolio = portfolio?.map((el) => {
        if (el.id === editCryptoAmountId) {
          return {
            ...el,
            amount: +editCryptoAmount,
          };
        }
        return el;
      });
      localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
      updatedPortfolio && setPortfolio(updatedPortfolio);
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
