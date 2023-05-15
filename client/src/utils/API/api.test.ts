import { getCryptoLogo } from "./api";

describe("API tests", () => {
  test("getCryptoLogo() should return correct logo URL", () => {
    const symbol = "BTC";
    const result = getCryptoLogo(symbol);
    expect(result).toEqual(
      `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`
    );
  });
});
