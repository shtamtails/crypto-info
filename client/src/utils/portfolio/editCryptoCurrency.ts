import {
  Portfolio,
  SelectedCrypto,
} from "../../context/PortfolioContext/PortfolioContext";
import { client } from "../tRPC";

/**
 * Edits the amount of a cryptocurrency in the user's portfolio.
 * @param {Object} params.portfolio - The user's portfolio object.
 * @param {Object} params.selectedCrypto - The selected cryptocurrency object to edit.
 * @param {string} params.amount - The new amount of the cryptocurrency.
 * @returns {Object} An object with the updated portfolio or an error message.
 */

interface EditCryptoCurrency {
  portfolio: Portfolio;
  selectedCrypto: SelectedCrypto | null;
  amount: string;
}

export const editCryptoCurrency = async ({
  portfolio,
  selectedCrypto,
  amount,
}: EditCryptoCurrency) => {
  if (!amount || +amount < 0 || !selectedCrypto) {
    return {
      error: !selectedCrypto
        ? "Cryptocurrency is not selected!"
        : "Wrong coin amount!",
    };
  }

  const selectedCryptoData = portfolio?.items.filter(
    (el) => el.id === selectedCrypto?.id
  )[0];

  const selectedCryptoID = portfolio?.items.findIndex(
    (crypto) => crypto.id === selectedCryptoData?.id
  );

  const { priceUsd: pricePerCoin } = await client.fetchAssetInfo.query({
    id: selectedCrypto.id,
  });

  const updatedPortfolio = Object.assign({}, portfolio);

  if (selectedCryptoID !== -1) {
    updatedPortfolio.items[selectedCryptoID].amount = +amount;
    updatedPortfolio.items[selectedCryptoID].oldPriceUSD =
      updatedPortfolio.items[selectedCryptoID].newPriceUSD;
    updatedPortfolio.items[selectedCryptoID].newPriceUSD =
      +amount * +pricePerCoin;
  } else {
    updatedPortfolio.items.push({
      name: selectedCrypto.name,
      id: selectedCrypto.id,
      symbol: selectedCrypto.symbol,
      amount: +amount,
      oldPriceUSD: +amount * +pricePerCoin,
      newPriceUSD: +amount * +pricePerCoin,
    });
  }
  updatedPortfolio.oldOverallSum = updatedPortfolio.items.reduce(
    (sum, crypto) => sum + crypto.oldPriceUSD,
    0
  );
  updatedPortfolio.newOverallSum = updatedPortfolio.items.reduce(
    (sum, crypto) => sum + crypto.newPriceUSD,
    0
  );

  return { updatedPortfolio };
};
