import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import env from "@/config/env";

if (env.VITE_NODE_ENV === "production") {
  disableReactDevTools();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
