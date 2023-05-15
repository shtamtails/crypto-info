import { useContext, useEffect, useState } from "react";
import { Modal, ModalDefaultProps } from "../../UI/Modal";
import { RiCoinsFill } from "react-icons/ri";
import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { PortfolioContext } from "../../context/PortfolioContext/PortfolioContext";
import { editCryptoCurrency } from "../../utils/portfolio/editCryptoCurrency";
import { CryptoCard } from "../../UI/CryptoCard";
import { getCryptoLogo } from "../../utils/API";
import "./AddCryptoModal.styles.scss";

export const AddCryptoModal: React.FC<ModalDefaultProps> = (props) => {
  const { visible, setVisible } = props;

  const { selectedCrypto, portfolio, setPortfolio } =
    useContext(PortfolioContext);

  const selectedCryptoData = portfolio?.items.filter(
    (el) => el.id === selectedCrypto?.id
  )[0];

  const [amount, setAmount] = useState<string>(
    selectedCryptoData?.amount.toString() || ""
  );
  const [amountError, setAmountError] = useState<string>("");

  useEffect(() => {
    setAmountError("");
  }, []);

  const handleAddCrypto = async () => {
    const { updatedPortfolio, error } = await editCryptoCurrency({
      portfolio,
      selectedCrypto,
      amount,
    });
    if (error) setAmountError(error);
    if (!error && updatedPortfolio) {
      setPortfolio(updatedPortfolio);
      localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
      setVisible(false);
    }
  };

  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      title="Add crypto"
      className="add-crypto-modal"
    >
      <div className="add-crypto-modal-body">
        <div className="add-crypto-modal__body__info">
          <CryptoCard
            name={selectedCrypto?.name || ""}
            symbol={selectedCrypto?.symbol || ""}
            logoURL={getCryptoLogo(selectedCrypto?.symbol || "")}
          />
        </div>
        <div className="add-crypto-modal__body__amount">
          Current amount: {selectedCryptoData?.amount || 0}
        </div>
      </div>
      <Input
        error={amountError}
        placeholder="Enter an amount of coins to add"
        icon={<RiCoinsFill size={18} />}
        value={amount}
        setValue={setAmount}
      />
      <Button fullWidth type="submit" onClick={handleAddCrypto} mt="xl">
        Confirm
      </Button>
    </Modal>
  );
};
