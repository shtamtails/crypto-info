import { useContext, useEffect } from "react";
import { AddCryptoModal } from "./components/AddCryptoModal";
import { PortfolioModal } from "./components/PortfolioModal";
import { CryptoInfo } from "./components/CryptoInfo";
import { CryptoList } from "./components/CryptoList";
import { Header } from "./components/Header";
import "./style/App.scss";
import "./style/utils.scss";
import { Route, Routes } from "react-router-dom";
import { PortfolioContext, IPortfolio } from "./context";
import { Page404 } from "./components/Page404/Page404";
import { client } from "./utils/tRPC";

function App() {
  const {
    portfolioModalOpened,
    addCryptoModalOpened,
    setAddCryptoModalOpened,
    setPortfolioModalOpened,
    setPortfolio,
    setNewPortfolioSum,
    setPortfolioSum,
  } = useContext(PortfolioContext);

  const loadCurrentRates = async () => {
    const portfolioData = localStorage.getItem("portfolio") ?? "[]";
    const portfolio: IPortfolio[] = JSON.parse(portfolioData);
    const overallSum = portfolio.reduce(
      (sum, crypto) => sum + crypto.priceUsd,
      0
    );
    setPortfolio(portfolio.sort((a, b) => b.priceUsd - a.priceUsd));
    const updatedPortfolio = await Promise.all(
      portfolio.map(async (el) => {
        const rates = await client.fetchAssetInfo.query({ id: el.id });
        // const rates = await fetchAssetInfo(el.id);
        el.oldPriceUsd = el.priceUsd;
        el.priceUsd = +rates.priceUsd * +el.amount;
        return el;
      })
    );
    const newOverallSum = portfolio.reduce(
      (sum, crypto) => sum + crypto.priceUsd,
      0
    );
    setPortfolioSum(overallSum);
    setNewPortfolioSum(newOverallSum);
    localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
  };

  useEffect(() => {
    loadCurrentRates();
  }, []);

  return (
    <>
      {/* {editCryptoModalOpened && (
        <EditCryptoModal
          visible={editCryptoModalOpened}
          setVisible={setEditCryptoModalOpened}
        />
      )} */}
      {portfolioModalOpened && (
        <PortfolioModal
          visible={portfolioModalOpened}
          setVisible={setPortfolioModalOpened}
        />
      )}
      {addCryptoModalOpened && (
        <AddCryptoModal
          visible={addCryptoModalOpened}
          setVisible={setAddCryptoModalOpened}
        />
      )}
      <Header />
      <Routes>
        <Route path="/" element={<CryptoList />} />
        <Route path="/:crypto" element={<CryptoInfo />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
