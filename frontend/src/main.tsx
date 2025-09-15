import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { Provider } from "react-redux";
import App from "@/App";
import config from "@/config";
import "@/styles/index.css";
import { store } from "./store";

if (config.VITE_NODE_ENV === "production") {
  disableReactDevTools();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
