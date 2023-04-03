import { useEffect, useState } from "react";
import { AddCryptoModal } from "./components/AddCryptoModal";
import { PortfolioModal } from "./components/PortfolioModal";
import { CryptoInfo } from "./components/CryptoInfo";
import { CryptoList } from "./components/CryptoList";
import { Header } from "./components/Header";
import "./style/App.scss";
import "./style/utils.scss";
import { fetchAssets } from "./utils/API/api";
import { Route, Routes } from "react-router-dom";

function App() {
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {}, []);

  return (
    <>
      {/* <PortfolioModal isVisible={modalVisible} setIsVisible={setModalVisible} /> */}
      {/* <AddCryptoModal visible={modalVisible} setVisible={setModalVisible} /> */}
      <Header />
      <Routes>
        <Route path="/" element={<CryptoList />} />
        <Route path="/:crypto" element={<CryptoInfo />} />
      </Routes>
    </>
  );
}

export default App;
