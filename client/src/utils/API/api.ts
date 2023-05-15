/**
 * Returns the CoinCap URL for the logo image of a cryptocurrency based on its symbol.
 * @param {string} symbol The symbol of the cryptocurrency.
 * @returns {string} The URL of the logo image for the specified cryptocurrency.
 */

export const getCryptoLogo = (symbol: string) => {
  return `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;
};
