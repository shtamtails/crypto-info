import { render, screen, waitFor } from "@testing-library/react";
import { Modal } from "./Modal";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Modal component", () => {
  const onCloseMock = vi.fn();

  const defaultProps = {
    setVisible: onCloseMock,
    title: "Test Modal",
    children: <div>Test Content</div>,
    testId: "modal",
  };

  afterEach(() => {
    onCloseMock.mockClear();
  });

  test("renders modal content", () => {
    render(<Modal visible={true} {...defaultProps} />);
    expect(screen.getByTestId("modal")).toHaveStyle({ opacity: 1 });
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("calls setIsOpened when close button is clicked", async () => {
    render(<Modal visible={true} {...defaultProps} />);
    const closeButton = screen.getByTestId("modal-close-button");
    userEvent.click(closeButton);
    await waitFor(() => {
      expect(screen.getByTestId("modal")).toHaveStyle({ opacity: 0 });
    });
  });

  test("closes modal when overlay is clicked", async () => {
    render(<Modal visible {...defaultProps} />);
    const overlay = screen.getByTestId("modal-overlay");
    userEvent.click(overlay);
    await waitFor(() => {
      expect(screen.getByTestId("modal")).toHaveStyle({ opacity: 0 });
    });
  });
});
