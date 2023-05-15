import { useContext, useEffect, useState } from "react";
import { Modal, ModalDefaultProps } from "../../UI/Modal";
import { PortfolioContext } from "../../context/PortfolioContext/PortfolioContext";
import { Input } from "../../UI/Input";
import { RiCoinsFill } from "react-icons/ri";
import { Button } from "../../UI/Button";
import { getCryptoLogo } from "../../utils/API";
import { CryptoCard } from "../../UI/CryptoCard";
import { editCryptoCurrency } from "../../utils/portfolio/editCryptoCurrency";
import { ModalContext } from "../../context/ModalContext/ModalContext";
import "./EditCryptoModal.styles.scss";

export const EditCryptoModal: React.FC<ModalDefaultProps> = (props) => {
  const { visible, setVisible } = props;
  const { setPortfolioModalOpened } = useContext(ModalContext);
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

  const handleSubmit = async () => {
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
      setPortfolioModalOpened(true);
    }
  };

  const handleDelete = () => {
    if (
      window.confirm("Are you sure you want to delete this cryptocurrency?")
    ) {
      if (portfolio) {
        portfolio.items = portfolio?.items.filter(
          (el) => el.id !== selectedCrypto?.id
        );
        portfolio.newOverallSum = portfolio.items.reduce(
          (sum, crypto) => sum + crypto.newPriceUSD,
          0
        );
        localStorage.setItem("portfolio", JSON.stringify(portfolio));
        setPortfolio(portfolio);
        setVisible(false);
        setPortfolioModalOpened(true);
      }
    }
  };

  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      title={`Edit crypto`}
      className="edit-crypto-modal"
    >
      <div className="edit-crypto-modal__body">
        <div className="edit-crypto-modal__body__info">
          <CryptoCard
            name={selectedCrypto?.name || ""}
            symbol={selectedCrypto?.symbol || ""}
            logoURL={getCryptoLogo(selectedCrypto?.symbol || "")}
          />
        </div>
        <div className="edit-crypto-modal__body__amount">
          Current amount: {selectedCryptoData?.amount}
        </div>
        <Input
          error={amountError}
          type="number"
          icon={<RiCoinsFill size={18} />}
          placeholder="Enter new amount of coins"
          value={amount}
          setValue={setAmount}
        />
        <Button onClick={handleSubmit} type="submit" fullWidth mt="xl">
          Confirm
        </Button>
        <Button
          onClick={handleDelete}
          type="submit"
          fullWidth
          mt="xl"
          variant="danger"
        >
          Delete crypto
        </Button>
      </div>
    </Modal>
  );
};
