import { formatNumber } from "./formatNumber";

describe("formatNumber() should work fine", () => {
  test("formatNumber() should return a number with 2 numbers after a dot", () => {
    expect(formatNumber("123.4567")).toBe("123.46");
    expect(formatNumber(123.4567)).toBe("123.46");
  });
});
