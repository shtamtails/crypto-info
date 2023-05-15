import { formatNumber } from "./formatNumber";

describe("formatNumber", () => {
  it("abbreviates number correctly", () => {
    expect(formatNumber(500, "abbreviate")).toBe("500.00");
    expect(formatNumber(5000, "abbreviate")).toBe("5k");
    expect(formatNumber(5500, "abbreviate")).toBe("5.5k");
    expect(formatNumber(5000000, "abbreviate")).toBe("5m");
    expect(formatNumber(5500000, "abbreviate")).toBe("5.5m");
    expect(formatNumber(5000000000, "abbreviate")).toBe("5b");
    expect(formatNumber(5500000000, "abbreviate")).toBe("5.5b");
    expect(formatNumber(5000000000000, "abbreviate")).toBe("5t");
    expect(formatNumber(5500000000000, "abbreviate")).toBe("5.5t");
    expect(formatNumber(5550000000000, "abbreviate")).toBe("5.55t");
    expect(formatNumber(5555000000000, "abbreviate")).toBe("5.55t");
  });

  it("formats number to fixed decimals", () => {
    expect(formatNumber(500, "fixed")).toBe("500.00");
    expect(formatNumber(500.1234, "fixed")).toBe("500.12");
    expect(formatNumber(500.1, "fixed")).toBe("500.10");
  });
});
