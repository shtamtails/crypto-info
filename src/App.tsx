import { useState } from "react";
import { CryptoList } from "./components/CryptoList/CryptoList";
import { Header } from "./components/Header/Header";
import { PortfolioModal } from "./components/PortfolioModal/PortfolioModal";
import "./style/App.scss";
import "./style/utils.scss";
import { AddCryptoModal } from "./components/AddCryptoModal/AddCryptoModal";
import { CryptoInfo } from "./components/CryptoInfo/CryptoInfo";

function App() {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <>
      {/* <PortfolioModal isVisible={modalVisible} setIsVisible={setModalVisible} /> */}
      <AddCryptoModal visible={modalVisible} setVisible={setModalVisible} />
      <Header />
      <CryptoList />
      <CryptoInfo />
    </>
  );
}

export default App;
