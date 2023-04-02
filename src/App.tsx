import { useState } from "react";
import { AddCryptoModal } from "./components/AddCryptoModal";
import { PortfolioModal } from "./components/PortfolioModal";
import { CryptoInfo } from "./components/CryptoInfo";
import { CryptoList } from "./components/CryptoList";
import { Header } from "./components/Header";
import "./style/App.scss";
import "./style/utils.scss";

function App() {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <>
      {/* <PortfolioModal isVisible={modalVisible} setIsVisible={setModalVisible} /> */}
      {/* <AddCryptoModal visible={modalVisible} setVisible={setModalVisible} /> */}
      <Header />
      <CryptoList />
      <CryptoInfo />
    </>
  );
}

export default App;
