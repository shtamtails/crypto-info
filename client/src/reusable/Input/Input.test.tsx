import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";
import { FcAbout } from "react-icons/fc";
import { vi } from "vitest";

describe("Input", () => {
  const props = {
    value: "",
    // setValue: jest.fn(),
    setValue: vi.fn(),
    label: "Username",
    placeholder: "Enter your username",
    icon: <FcAbout />,
    type: "text",
    error: "",
    testId: "input-test",
  };

  it("renders the label and placeholder correctly", () => {
    render(<Input {...props} />);
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your username")
    ).toBeInTheDocument();
  });

  it("calls the setValue function when the input value changes", () => {
    render(<Input {...props} />);
    const input = screen.getByTestId("input-test");
    userEvent.type(input, "React");
    expect(props.setValue).toHaveBeenCalledTimes(5);
  });

  it("renders an icon when provided", () => {
    render(<Input {...props} />);
    expect(screen.getByTestId("input-test")).toHaveClass(
      "input__container__base--with-icon"
    );
    expect(screen.getByTestId("input-icon")).toBeInTheDocument();
  });

  it("renders an error message when provided", () => {
    render(<Input {...props} error="Invalid username" />);
    expect(screen.getByText("Invalid username")).toBeInTheDocument();
  });
});
