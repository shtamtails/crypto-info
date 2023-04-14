import { abbreviateNumber } from "./abbreviateNumber";

describe("abbreviateNumber() should work fine", () => {
  test("should not abbreviate numbers below 1000", () => {
    expect(abbreviateNumber(999)).toBe("999.00");
    expect(abbreviateNumber(123)).toBe("123.00");
  });

  test("abbreviate number should return correct thousands", () => {
    expect(abbreviateNumber(1000)).toBe("1k");
    expect(abbreviateNumber(1234)).toBe("1.23k");
    expect(abbreviateNumber(12345)).toBe("12.35k");
    expect(abbreviateNumber(999999)).toBe("1000k");
  });

  test("abbreviate number should return correct millions", () => {
    expect(abbreviateNumber(1000000)).toBe("1m");
    expect(abbreviateNumber(1234567)).toBe("1.23m");
    expect(abbreviateNumber(12345678)).toBe("12.35m");
    expect(abbreviateNumber(999999999)).toBe("1000m");
  });

  test("abbreviate number should return correct billions", () => {
    expect(abbreviateNumber(1000000000)).toBe("1b");
    expect(abbreviateNumber(1234567890)).toBe("1.23b");
    expect(abbreviateNumber(12345678900)).toBe("12.35b");
    expect(abbreviateNumber(999999999999)).toBe("1000b");
  });

  test("abbreviate number should return correct trillions", () => {
    expect(abbreviateNumber(1000000000000)).toBe("1t");
    expect(abbreviateNumber(1234567890000)).toBe("1.23t");
    expect(abbreviateNumber(12345678900000)).toBe("12.35t");
    expect(abbreviateNumber(999999999999999)).toBe("1000t");
  });
});
