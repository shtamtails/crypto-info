import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CryptoCard } from "./CryptoCard";

describe("CryptoCard", () => {
  const defaultProps = {
    logoURL: "https://assets.coincap.io/assets/icons/BTC@2x.png",
    name: "Bitcoin",
    symbol: "BTC",
    testId: "crypto-card",
  };

  it("should render the component", () => {
    render(<CryptoCard {...defaultProps} />);
    expect(screen.getByTestId("crypto-card")).toBeInTheDocument();
    expect(screen.getByTestId("crypto-card-name")).toHaveTextContent("Bitcoin");
    expect(screen.getByTestId("crypto-card-symbol")).toHaveTextContent("BTC");
    expect(screen.getByTestId("crypto-card-icon")).toHaveAttribute(
      "src",
      "https://assets.coincap.io/assets/icons/BTC@2x.png"
    );
  });

  it("should have margins/paddings", () => {
    render(<CryptoCard {...defaultProps} ml="xl" pl="xl" />);
    expect(screen.getByTestId("crypto-card")).toHaveClass("padding-left-xl");
    expect(screen.getByTestId("crypto-card")).toHaveClass("margin-left-xl");
  });

  it("should change styles", () => {
    render(<CryptoCard {...defaultProps} style={{ backgroundColor: "red" }} />);
    expect(screen.getByTestId("crypto-card")).toHaveStyle(
      "backgroundColor: red"
    );
  });
});
