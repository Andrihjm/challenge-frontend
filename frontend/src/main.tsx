import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import ReactQueryProvider from "./providers/react-query-provider.tsx";
import ReduxProvider from "./providers/redux-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider>
      <ReactQueryProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReactQueryProvider>
    </ReduxProvider>
  </StrictMode>,
);
