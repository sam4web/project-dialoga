import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import App from "@/App";
import env from "@/config/env";
import "@/styles/index.css";

if (env.VITE_NODE_ENV === "production") {
  disableReactDevTools();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
