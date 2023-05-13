import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Input } from "../Input";
import { Button } from "../Button";
import { useState } from "react";
import "../../style/utils.scss";

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Modal>;

const ModalBody = () => {
  const [error, setError] = useState("");
  const handleClick = () => {
    setError("Wrong username or password!");
  };
  return (
    <>
      <Input mb="xl" label="Username" />
      <Input error={error} mb="xl" label="Password" type="password" />
      <Button fullWidth variant="regular" onClick={handleClick}>
        Log in
      </Button>
    </>
  );
};

export const Preview = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>Open modal</Button>
      {visible && (
        <Modal
          width={600}
          title="Authentication"
          visible={visible}
          setVisible={setVisible}
        >
          <ModalBody />
        </Modal>
      )}
    </>
  );
};

export const Default: Story = {
  args: {
    width: 600,
    children: <ModalBody />,
    title: "Modal",
  },
};
