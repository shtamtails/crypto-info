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
import { DefaultContext, IPortfolio } from "./context";

function App() {
  const { portfolioModalOpened, addCryptoModalOpened, setAddCryptoModalOpened, setPortfolioModalOpened, setPortfolio } =
    useContext(DefaultContext);

  const loadCurrentRates = async () => {
    const portfolioData = localStorage.getItem("portfolio");
    if (portfolioData) {
      const portfolio: IPortfolio[] = JSON.parse(portfolioData);
      setPortfolio(portfolio.sort((a, b) => b.priceUsd - a.priceUsd));
      const updatedPortfolio = await Promise.all(
        portfolio.map(async (el) => {
          const rates = await fetchAssetInfo(el.id);
          el.priceUsd = +rates.priceUsd * +el.amount;
          return el;
        })
      );
      console.log(portfolio[0].priceUsd);
      localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
    }
  };

  useEffect(() => {
    loadCurrentRates();
  }, []);

  return (
    <>
      <PortfolioModal isVisible={portfolioModalOpened} setIsVisible={setPortfolioModalOpened} />
      <AddCryptoModal visible={addCryptoModalOpened} setVisible={setAddCryptoModalOpened} />
      <Header />
      <Routes>
        <Route path="/" element={<CryptoList />} />
        <Route path="/:crypto" element={<CryptoInfo />} />
      </Routes>
    </>
  );
}

export default App;
