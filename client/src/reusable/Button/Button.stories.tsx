import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { defaultArgs } from "../../../.storybook/argTypes";
import { AiOutlineSearch } from "react-icons/ai";
import "../../style/utils.scss";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    ...defaultArgs,
    children: {
      name: "label",
      description: "Content inside of the button",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Regular: Story = {
  args: {
    children: "Regular button",
    variant: "regular",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline button",
    variant: "outline",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger button",
    variant: "danger",
  },
};

export const WithIcon = () => {
  return (
    <div className="flex">
      <Button leftIcon={<AiOutlineSearch />} mr="xl">
        Search
      </Button>
      <Button rightIcon={<AiOutlineSearch />}>Search</Button>
    </div>
  );
};
