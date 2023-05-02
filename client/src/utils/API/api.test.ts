import { getCryptoLogo } from "./api";
// import axios from "axios";
// import { fetchAssets, fetchAssetInfo, fetchRates, getCryptoLogo } from "./api";
// import { TimePeriods } from "./types";

// jest.mock("axios");

describe("API tests", () => {
  test("getCryptoLogo() should return correct logo URL", () => {
    const symbol = "BTC";
    const result = getCryptoLogo(symbol);
    expect(result).toEqual(
      `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`
    );
  });

  //   beforeEach(() => {
  //     jest.clearAllMocks();
  //   });

  //   test("fetchAssets() should return assets data", async () => {
  //     const mockData = {
  //       data: [
  //         {
  //           id: "bitcoin",
  //           rank: "1",
  //           symbol: "BTC",
  //           name: "Bitcoin",
  //           supply: "19345343.0000000000000000",
  //           maxSupply: "21000000.0000000000000000",
  //           marketCapUsd: "589041325037.4265146627540439",
  //           volumeUsd24Hr: "5404408536.5677607753559608",
  //           priceUsd: "30448.7403008272592873",
  //           changePercent24Hr: "1.7039911357537621",
  //           vwap24Hr: "30283.0658945695485650",
  //           explorer: "https://blockchain.info/",
  //         },
  //         {
  //           id: "ethereum",
  //           rank: "2",
  //           symbol: "ETH",
  //           name: "Ethereum",
  //           supply: "120457776.0000000000000000",
  //           maxSupply: null,
  //           marketCapUsd: "242771356291.8823350744212784",
  //           volumeUsd24Hr: "5530157513.8363164966610770",
  //           priceUsd: "2015.4062639499697809",
  //           changePercent24Hr: "4.8772233688715851",
  //           vwap24Hr: "1980.6261231580534967",
  //           explorer: "https://etherscan.io/",
  //         },
  //       ],
  //     };
  //     const mockResponse = { data: { data: mockData } };
  //     (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);
  //     const limit = 5;
  //     const offset = 0;
  //     const result = await fetchAssets(limit, offset);
  //     expect(axios.get).toHaveBeenCalledTimes(1);
  //     expect(axios.get).toHaveBeenCalledWith("https://api.coincap.io/v2/assets", {
  //       params: { limit, offset },
  //     });
  //     expect(result).toEqual(mockData);
  //   });

  //   test("fetchAssetInfo() should return asset info", async () => {
  //     const mockData = {
  //       data: {
  //         id: "bitcoin",
  //         rank: "1",
  //         symbol: "BTC",
  //         name: "Bitcoin",
  //         supply: "19345343.0000000000000000",
  //         maxSupply: "21000000.0000000000000000",
  //         marketCapUsd: "589156881611.2237514293731417",
  //         volumeUsd24Hr: "5262621734.7836922243045952",
  //         priceUsd: "30454.7136544037369319",
  //         changePercent24Hr: "1.6098424530172626",
  //         vwap24Hr: "30284.9926059069006142",
  //         explorer: "https://blockchain.info/",
  //       },
  //     };
  //     const mockResponse = { data: { data: mockData } };
  //     (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);
  //     const id = "bitcoin";
  //     const result = await fetchAssetInfo(id);
  //     expect(axios.get).toHaveBeenCalledTimes(1);
  //     expect(axios.get).toHaveBeenCalledWith(
  //       `https://api.coincap.io/v2/assets/${id}`,
  //       {
  //         params: undefined,
  //       }
  //     );
  //     expect(result).toEqual(mockData);
  //   });

  //   test("fetchRates() should return rates data", async () => {
  //     const mockData = {
  //       data: {
  //         id: "bitcoin",
  //         symbol: "BTC",
  //         currencySymbol: "₿",
  //         type: "crypto",
  //         rateUsd: "30453.4195161324445193",
  //       },
  //     };
  //     const mockResponse = { data: { data: mockData } };
  //     (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);
  //     const id = "bitcoin";
  //     const result = await fetchRates(id);
  //     expect(axios.get).toHaveBeenCalledTimes(1);
  //     expect(axios.get).toHaveBeenCalledWith(
  //       `https://api.coincap.io/v2/rates/${id}`,
  //       {
  //         params: undefined,
  //       }
  //     );
  //     expect(result).toEqual(mockData);
  //   });

  // test("fetchPriceHistory() should return price history data", async () => {
  //   const mockPriceData = [
  //     {
  //       priceUsd: "24761.5588442652268305",
  //       time: 1678842000000,
  //     },
  //     {
  //       priceUsd: "24761.5588442652268305",
  //       time: 1678842000000,
  //     },
  //   ];
  //   const mockResponse = { data: { data: mockPriceData } };
  //   (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);
  //   const symbol = "BTC";
  //   const result = await fetchPriceHistory(symbol, TimePeriods.ONE_DAY);
  //   expect(axios.get).toHaveBeenCalledTimes(1);
  //   expect(axios.get).toHaveBeenCalledWith(
  //     `https://api.coincap.io/v2/assets/${symbol}/history`,
  //     {
  //       params: {
  //         interval: "h1",
  //         start: expect.any(Number),
  //         end: expect.any(Number),
  //       },
  //     }
  //   );
  //   expect(result).toEqual(mockPriceData);
  // });
});
