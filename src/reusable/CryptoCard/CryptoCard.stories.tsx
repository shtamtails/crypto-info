import type { Meta, StoryObj } from "@storybook/react";
import { CryptoCard } from "./CryptoCard";
import "../../style/utils.scss";

const meta: Meta<typeof CryptoCard> = {
  title: "UI/CryptoCard",
  component: CryptoCard,
  tags: ["autodocs"],
  argTypes: {
    logoURL: {
      description:
        "URL to cryptocurrency image. Use getCryptoLogo(symbol) to get logo",
    },
    name: {
      description: "Name of the cryptocurrency",
    },
    shortName: {
      description:
        "Short name (symbol) of the cryptocurrency. F.e. - BTC (Bitcoin)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CryptoCard>;

export const Default: Story = {
  args: {
    logoURL: "https://assets.coincap.io/assets/icons/btc@2x.png",
    name: "Bitcoin",
    shortName: "BTC",
  },
};
