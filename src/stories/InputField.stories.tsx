import type { Meta, StoryObj } from "@storybook/react";
import InputField from "../components/InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
};

export default meta;   // 👈 this must exist

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    variant: "outlined",
    size: "md",
  },
};

export const WithHelper: Story = {
  args: {
    label: "Email",
    placeholder: "Enter email",
    helperText: "We’ll never share your email.",
  },
};

export const Invalid: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    invalid: true,
    errorMessage: "Password is too short",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled field",
    placeholder: "Can’t type here",
    disabled: true,
  },
};

export const Password = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    type: "password",
  },
};

