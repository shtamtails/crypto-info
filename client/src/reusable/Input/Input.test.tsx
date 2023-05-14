import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Input } from "./Input";
import { AiFillAlert } from "react-icons/ai";
import { vi } from "vitest";

describe("Input", () => {
  it("should call the setValue function when the input value changes", () => {
    const setValueMock = vi.fn();
    render(<Input setValue={setValueMock} testId="input-test" />);
    const input = screen.getByTestId("input-test");
    userEvent.type(input, "React");
    expect(setValueMock).toHaveBeenCalledTimes(5);
  });

  it("should render input component", () => {
    render(<Input testId="input-test" />);
    expect(screen.getByTestId("input-test-wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("input-test")).toBeInTheDocument();
  });

  it("should render label", () => {
    render(<Input label="Testing Label" testId="input-test" />);
    const labelElement = screen.getByTestId("input-test-label");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent("Testing Label");
    expect(screen.getByTestId("input-test-label")).toBeInTheDocument();
  });

  it("should render icon", () => {
    render(<Input icon={<AiFillAlert />} testId="input-test" />);
    expect(screen.getByTestId("input-test")).toHaveClass("input--with-icon");
    expect(screen.getByTestId("input-test-icon")).toBeInTheDocument();
  });

  it("should render error", () => {
    render(<Input error="Testing Error" testId="input-test" />);
    const errorElement = screen.getByTestId("input-test-error");
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent("Testing Error");
  });

  it("should have placeholder", () => {
    render(<Input placeholder="Testing Placeholder" testId="input-test" />);
    expect(screen.getByTestId("input-test")).toHaveAttribute(
      "placeholder",
      "Testing Placeholder"
    );
  });

  it("should change type correctly", () => {
    render(<Input type="number" testId="input-test" />);
    expect(screen.getByTestId("input-test")).toHaveAttribute("type", "number");
  });

  it("should disable correctly", () => {
    render(<Input disabled testId="input-test" />);
    const inputElement = screen.getByTestId("input-test");
    expect(inputElement).toHaveAttribute("disabled");
    expect(inputElement).toHaveClass("input--disabled");
  });

  it("should change style/width/height", () => {
    render(
      <Input
        width={200}
        height="200px"
        style={{ backgroundColor: "red" }}
        testId="input-test"
      />
    );
    expect(screen.getByTestId("input-test")).toHaveStyle(
      "backgroundColor: red"
    );
    expect(screen.getByTestId("input-test")).toHaveStyle("width: 200px");
    expect(screen.getByTestId("input-test")).toHaveStyle("height: 200px");
  });

  it("should have margins and paddings when provided", () => {
    render(<Input ml="xl" pl="xl" testId="input-test" />);
    expect(screen.getByTestId("input-test-wrapper")).toHaveClass(
      "padding-left-xl"
    );
    expect(screen.getByTestId("input-test-wrapper")).toHaveClass(
      "margin-left-xl"
    );
  });
});
