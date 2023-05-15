import { useContext, useEffect } from "react";
import {
  Portfolio,
  PortfolioContext,
} from "./context/PortfolioContext/PortfolioContext";
import { updatePortfolioPrices } from "./utils/portfolio/updatePortfolioPrices";
import { Routes, Route } from "react-router-dom";
import { AddCryptoModal } from "./components/AddCryptoModal";
import { CryptoInfo } from "./components/CryptoInfo";
import { CryptoList } from "./components/CryptoList";
import { Header } from "./components/Header";
import { Page404 } from "./components/Page404/Page404";
import { PortfolioModal } from "./components/PortfolioModal";
import { ModalContext } from "./context/ModalContext/ModalContext";
import { EditCryptoModal } from "./components/EditCryptoModal/EditCryptoModal";
import "./style/App.scss";
import "./style/utils.scss";

function App() {
  const { setPortfolio } = useContext(PortfolioContext);
  const {
    addCryptoModalOpened,
    setAddCryptoModalOpened,
    portfolioModalOpened,
    setPortfolioModalOpened,
    editCryptoModalOpened,
    setEditCryptoModalOpened,
  } = useContext(ModalContext);

  useEffect(() => {
    (async () => {
      const portfolioData = localStorage.getItem("portfolio") ?? "[]";
      const portfolio: Portfolio = JSON.parse(portfolioData);
      if (portfolio.items) {
        const updatedPortfolio = await updatePortfolioPrices(portfolio);
        localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
        setPortfolio(updatedPortfolio);
      }
    })();
  }, [setPortfolio]);

  return (
    <>
      {editCryptoModalOpened && (
        <EditCryptoModal
          visible={editCryptoModalOpened}
          setVisible={setEditCryptoModalOpened}
        />
      )}
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
