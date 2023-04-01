import { useState } from "react";
import { CryptoList } from "./components/CryptoList/CryptoList";
import { Header } from "./components/Header/Header";
import { PortfolioModal } from "./components/PortfolioModal/PortfolioModal";
import "./style/App.scss";
import "./style/utils.scss";

function App() {
  const [modalVisible, setModalVisible] = useState(true); // TODO Add redux to store this value in it.
  return (
    <>
      <PortfolioModal isVisible={modalVisible} setIsVisible={setModalVisible} />
      <Header />
      <CryptoList />
    </>
  );
}

export default App;
