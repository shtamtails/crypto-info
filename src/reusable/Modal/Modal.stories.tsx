import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import "../../style/utils.scss";

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    children: "Modal Body",
    title: "Modal",
  },
};
