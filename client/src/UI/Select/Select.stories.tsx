import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";
import { defaultArgs } from "../../../.storybook/argTypes";
import { AiOutlineSearch } from "react-icons/ai";
import "../Input/Input.styles.scss";
import "../../style/utils.scss";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    ...defaultArgs,
    value: {
      description:
        "A value, that represents the current state of the component.",
    },
    setValue: {
      description: "A function that changes the state of component",
    },
    error: {
      description: "Text that displayed below the input with red text color",
    },
    data: {
      description: "Data in format [ { label: 'value', value: 'value' } ]",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    icon: <AiOutlineSearch />,
    label: "The best framework",
    fullWidth: true,
    data: [
      { label: "React", value: "react" },
      { label: "Angular", value: "angular" },
      { label: "Vue", value: "vue" },
    ],
  },
};
