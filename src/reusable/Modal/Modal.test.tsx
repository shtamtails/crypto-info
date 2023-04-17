import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Modal } from "./Modal";

describe("Modal", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockReset();
  });

  const defaultProps = {
    visible: true,
    setVisible: mockOnClose,
    title: "Modal Title",
    width: 400,
    className: "test-modal",
    testId: "test-modal",
  };

  it("modal should be rendered", () => {
    render(<Modal {...defaultProps}>Modal</Modal>);
    const modal = screen.getByTestId("test-modal");
    expect(modal).toBeInTheDocument();
  });

  it("modal should not be rendered when visible set to false", () => {
    render(
      <Modal {...defaultProps} visible={false}>
        Modal
      </Modal>
    );
    const modal = screen.queryByTestId("test-modal");
    expect(modal).not.toBeInTheDocument();
  });

  it("renders Modal component with correct content and calls onClose function when close button is clicked", () => {
    const content = "This is a test modal content";
    render(<Modal {...defaultProps}>{content}</Modal>);

    const titleElement = screen.getByText("Modal Title");
    const contentElement = screen.getByText(content);
    const closeButton = screen.getByTestId("close-modal-button");

    expect(titleElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
