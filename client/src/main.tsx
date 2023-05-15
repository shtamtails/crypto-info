import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ModalContextProvider } from "./context/ModalContext/ModalContext";
import { PortfolioContextProvider } from "./context/PortfolioContext/PortfolioContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ModalContextProvider>
      <PortfolioContextProvider>
        <App />
      </PortfolioContextProvider>
    </ModalContextProvider>
  </BrowserRouter>
);
