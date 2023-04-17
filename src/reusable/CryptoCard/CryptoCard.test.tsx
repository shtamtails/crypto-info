import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CryptoCard } from "./CryptoCard";

describe("CryptoCard", () => {
  const props = {
    logoURL: "https://assets.coincap.io/assets/icons/BTC@2x.png",
    name: "Bitcoin",
    shortName: "BTC",
    testId: "CryptoCard",
  };

  it("renders the cryptocurrency name and symbol", () => {
    render(<CryptoCard {...props} />);
    expect(
      screen.getByTestId("cryptocurrency-component_name")
    ).toHaveTextContent("Bitcoin");
    expect(screen.getByText("BTC")).toBeInTheDocument();
  });

  it("renders the cryptocurrency logo", () => {
    render(<CryptoCard {...props} />);
    expect(screen.getByAltText("Bitcoin logo")).toHaveAttribute(
      "src",
      "https://assets.coincap.io/assets/icons/BTC@2x.png"
    );
  });
});
