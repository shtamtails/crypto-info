import { useContext, useEffect } from "react";
import { AddCryptoModal } from "./components/AddCryptoModal";
import { PortfolioModal } from "./components/PortfolioModal";
import { CryptoInfo } from "./components/CryptoInfo";
import { CryptoList } from "./components/CryptoList";
import { Header } from "./components/Header";
import "./style/App.scss";
import "./style/utils.scss";
import { Route, Routes } from "react-router-dom";
import { fetchAssetInfo } from "./utils/API/api";
import { PortfolioContext, IPortfolio } from "./context";
import { Page404 } from "./components/Page404/Page404";
import { EditCryptoModal } from "./components/EditCryptoModal/EditCryptoModal";

function App() {
  const {
    portfolioModalOpened,
    addCryptoModalOpened,
    setAddCryptoModalOpened,
    setPortfolioModalOpened,
    setPortfolio,
  } = useContext(PortfolioContext);

  const loadCurrentRates = async () => {
    const portfolioData = localStorage.getItem("portfolio") ?? "[]";
    const portfolio: IPortfolio[] = JSON.parse(portfolioData);
    setPortfolio(portfolio.sort((a, b) => b.priceUsd - a.priceUsd));
    const updatedPortfolio = await Promise.all(
      portfolio.map(async (el) => {
        const rates = await fetchAssetInfo(el.id);
        el.priceUsd = +rates.priceUsd * +el.amount;
        return el;
      })
    );
    localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
  };

  useEffect(() => {
    loadCurrentRates();
  }, []);

  return (
    <>
      <EditCryptoModal />
      <PortfolioModal
        isVisible={portfolioModalOpened}
        setIsVisible={setPortfolioModalOpened}
      />
      <AddCryptoModal
        visible={addCryptoModalOpened}
        setVisible={setAddCryptoModalOpened}
      />
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
