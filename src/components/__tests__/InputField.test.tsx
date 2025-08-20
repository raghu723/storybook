// InputField.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import InputField from "../InputField";

describe("InputField Component", () => {
  it("renders with label and placeholder", () => {
    render(<InputField label="Username" placeholder="Enter username" />);
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const handleChange = vi.fn();
    render(<InputField label="Email" placeholder="Enter email" onChange={handleChange} />);
    const input = screen.getByPlaceholderText("Enter email");
    fireEvent.change(input, { target: { value: "test@example.com" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("shows helper text", () => {
    render(<InputField label="Name" helperText="This is a helper" />);
    expect(screen.getByText("This is a helper")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<InputField label="Password" errorMessage="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("renders disabled input", () => {
    render(<InputField label="Disabled" disabled />);
    const input = screen.getByLabelText("Disabled");
    expect(input).toBeDisabled();
  });

  it("renders clear button when value is present", () => {
    const handleChange = vi.fn();
    render(<InputField label="Clear" value="Hello" onChange={handleChange} />);
    const clearButton = screen.getByRole("button", { name: /clear input/i });
    expect(clearButton).toBeInTheDocument();
    fireEvent.click(clearButton);
    expect(handleChange).toHaveBeenCalled();
  });

  it("toggles password visibility", () => {
    render(<InputField label="Password" type="password" />);
    const toggleButton = screen.getByRole("button", { name: /toggle password visibility/i });
    expect(toggleButton).toBeInTheDocument();

    const input = screen.getByLabelText("Password") as HTMLInputElement;
    expect(input.type).toBe("password");

    fireEvent.click(toggleButton);
    expect(input.type).toBe("text");

    fireEvent.click(toggleButton);
    expect(input.type).toBe("password");
  });

  it("shows loading spinner", () => {
    render(<InputField label="Loading" loading />);
    const spinner = screen.getByRole("status", { hidden: true });
    expect(spinner).toBeInTheDocument();
  });
});
