import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PortfolioContextProvider } from "./context/PortfolioContext";
import { EditCryptoContextProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <EditCryptoContextProvider>
      <PortfolioContextProvider>
        <App />
      </PortfolioContextProvider>
    </EditCryptoContextProvider>
  </BrowserRouter>
);
