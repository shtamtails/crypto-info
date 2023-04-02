import { useRef } from "react";
import { Button } from "../../reusable/Button";
import { Input } from "../../reusable/Input";
import { Modal } from "../../reusable/Modal";
import { dataType, Select } from "../../reusable/Select";
import { AddCryptoModalProps } from "./types";
import "./addCryptoModal.scss";

export const AddCryptoModal: React.FC<AddCryptoModalProps> = ({ visible, setVisible }) => {
  const amountRef = useRef<HTMLInputElement>(null);
  const cryptoRef = useRef<HTMLSelectElement>(null);

  const data: dataType[] = [
    {
      label: "1",
      value: "1",
    },
    {
      label: "2",
      value: "2",
    },
    {
      label: "3",
      value: "3",
    },
  ];

  const handleAddCrypto = () => {
    const amount = amountRef.current?.value;
    const crypto = cryptoRef.current?.value;
  };

  return (
    <Modal visible={visible} setVisible={setVisible} title="Add crypto" className="add-crypto-modal">
      <div className="add-crypto-modal-select">
        <Select ref={cryptoRef} data={data} label="Cryptocurrency" />
      </div>
      <div className="add-crypto-modal-amount-input">
        <Input ref={amountRef} fullWidth label="Amount" placeholder="Amount" icon="$" />
      </div>

      <Button fullWidth variant="regular" onClick={handleAddCrypto}>
        Add
      </Button>
    </Modal>
  );
};
