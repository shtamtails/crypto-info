import { RefObject, useRef, useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Modal } from "../Modal/Modal";
import { AddCryptoModalProps } from "./IAddCryptoModal";
import "./addCryptoModal.scss";

export const AddCryptoModal: React.FC<AddCryptoModalProps> = ({ visible, setVisible }) => {
  const [amount, setAmount] = useState<string>("");
  const amountRef = useRef<HTMLInputElement>(null);

  const handleAddCrypto = () => {
    const amount = amountRef.current?.value;
  };

  return (
    <Modal visible={visible} setVisible={setVisible} title="Add crypto" className="add-crypto-modal">
      <div className="add-crypto-modal-select">q</div>
      <div className="add-crypto-modal-amount-input">
        <Input
          ref={amountRef}
          fullWidth
          value={amount}
          setValue={setAmount}
          label="Amount"
          placeholder="Amount"
          icon="$"
        />
      </div>

      <Button fullWidth variant="regular" onClick={handleAddCrypto}>
        Add
      </Button>
    </Modal>
  );
};
