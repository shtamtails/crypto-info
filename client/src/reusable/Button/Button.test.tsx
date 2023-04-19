import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./Button";

describe("Button", () => {
  const defaultProps = {
    children: "Click me!",
    onClick: jest.fn(),
    testId: "button",
  };

  it("renders a button with default props", () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me!");
  });

  it("applies the specified variant class", () => {
    render(<Button {...defaultProps} variant="regular" />);
    const button = screen.getByTestId("button");
    expect(button).toHaveClass("button--regular");
  });

  it("passes through custom width and height styles", () => {
    render(<Button {...defaultProps} width="200px" height="50px" />);
    const button = screen.getByTestId("button");
    expect(button).toHaveStyle({ width: "200px", height: "50px" });
  });

  it("calls the onClick function when clicked", () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByTestId("button");
    fireEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
