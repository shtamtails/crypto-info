import { createContext, useContext, useEffect, useState } from "react";
import { AddCryptoModal } from "./components/AddCryptoModal";
import { PortfolioModal } from "./components/PortfolioModal";
import { CryptoInfo } from "./components/CryptoInfo";
import { CryptoList } from "./components/CryptoList";
import { Header } from "./components/Header";
import "./style/App.scss";
import "./style/utils.scss";
import { fetchAssets } from "./utils/API/api";
import { Route, Routes } from "react-router-dom";
import { ModalContext, ModalProvider } from "./context/modalContext";

function App() {
  const { portfolioModalOpened, addCryptoModalOpened, setAddCryptoModalOpened, setPortfolioModalOpened } =
    useContext(ModalContext);

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
