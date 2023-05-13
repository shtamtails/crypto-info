import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./Button";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { AiFillAccountBook } from "react-icons/ai";

describe("Button", () => {
  it("should call onClick function when clicked", () => {
    const onClickMock = vi.fn();
    render(
      <Button onClick={onClickMock} testId="button-test">
        Click me!
      </Button>
    );
    userEvent.click(screen.getByTestId("button-test"));
    expect(onClickMock).toBeCalledTimes(1);
  });

  it("should set the correct variant className when provided", () => {
    render(
      <Button variant="regular" testId="button-test">
        Click me!
      </Button>
    );
    const buttonElement = screen.getByTestId("button-test");
    expect(buttonElement).toHaveClass("button--regular");
  });

  it("should have margins and paddings when provided", () => {
    render(
      <Button testId="button-test" ml="xl" pl="xl">
        Click me!
      </Button>
    );
    const buttonElement = screen.getByTestId("button-test");
    expect(buttonElement).toHaveClass("padding-left-xl");
    expect(buttonElement).toHaveClass("margin-left-xl");
  });

  it("should change style/width/height", () => {
    render(
      <Button
        testId="button-test"
        width={200}
        height="200px"
        style={{ backgroundColor: "red" }}
      >
        Click me!
      </Button>
    );
    const buttonElement = screen.getByTestId("button-test");
    expect(buttonElement).toHaveStyle("width: 200px");
    expect(buttonElement).toHaveStyle("height: 200px");
    expect(buttonElement).toHaveStyle("backgroundColor: red");
  });

  it("should disable button when provided", () => {
    render(
      <Button testId="button-test" disabled>
        Click me!
      </Button>
    );
    const buttonElement = screen.getByTestId("button-test");
    expect(buttonElement).toHaveClass("button--disabled");
    expect(buttonElement).toHaveAttribute("disabled");
  });

  it("should render icons when provided", () => {
    render(
      <Button
        leftIcon={<AiFillAccountBook />}
        rightIcon={<AiFillAccountBook />}
        testId="button-test"
        disabled
      >
        Click me!
      </Button>
    );
    expect(screen.getByTestId("button-test-left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("button-test-right-icon")).toBeInTheDocument();
  });
});
