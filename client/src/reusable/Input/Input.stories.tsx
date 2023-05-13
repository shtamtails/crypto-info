import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import "../../style/utils.scss";
import { defaultArgs } from "../../../.storybook/argTypes";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
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
    icon: {
      description: `Icon component. F.e. we can use react-icons package and pass FiCircle component as the value`,
    },
    type: {
      description: "Type of the input",
      options: ["text", "password", "email", "number"],
    },
    error: {
      description: "Text that displayed below the input with red text color",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    pl: "xl",
  },
};
