import { Portfolio } from "../../context/PortfolioContext/PortfolioContext";
import { client } from "../tRPC";

/**
 * Updates the prices of cryptocurrencies in the given portfolio by fetching the current price
 * of each cryptocurrency from an CoinCap API.
 *
 * @param {Portfolio} portfolio - The portfolio whose cryptocurrency prices are to be updated.
 *
 * @returns {Promise<Portfolio>} A promise that resolves to the updated portfolio object.
 */

export const updatePortfolioPrices = async (portfolio: Portfolio) => {
  const updatedPortfolio = Object.assign({}, portfolio);
  for (const item of updatedPortfolio.items) {
    const { priceUsd } = await client.fetchAssetInfo.query({ id: item.id });
    item.oldPriceUSD = item.newPriceUSD;
    item.newPriceUSD = item.amount * +priceUsd;
  }

  updatedPortfolio.oldOverallSum = updatedPortfolio.items.reduce(
    (sum, crypto) => sum + crypto.oldPriceUSD,
    0
  );

  updatedPortfolio.newOverallSum = updatedPortfolio.items.reduce(
    (sum, crypto) => sum + crypto.newPriceUSD,
    0
  );

  return updatedPortfolio;
};
