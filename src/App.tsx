import { CryptoList } from "./components/CryptoList/CryptoList";
import { Header } from "./components/Header/Header";
import "./style/App.scss";
import "./style/utils.scss";

function App() {
  return (
    <>
      <Header />
      <CryptoList />
    </>
  );
}

export default App;
