import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { Select } from "./Select";
import { vi } from "vitest";

describe("Select", () => {
  // const mockSetValue = jest.fn();
  const mockSetValue = vi.fn();

  beforeEach(() => {
    mockSetValue.mockReset();
  });

  const defaultProps = {
    data: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
    placeholder: "Select an option",
    value: "",
    setValue: mockSetValue,
    label: "Select Label",
    className: "test-select",
    testId: "test-select",
  };

  it("renders Select component with correct content and calls setValue function when an option is selected", () => {
    render(<Select {...defaultProps} />);
    const labelElement = screen.getByText("Select Label");
    const selectElement = screen.getByTestId("test-select");

    expect(labelElement).toBeInTheDocument();
    expect(selectElement).toBeInTheDocument();

    fireEvent.change(selectElement, { target: { value: "option2" } });
    expect(mockSetValue).toHaveBeenCalledWith("option2");
  });
});
