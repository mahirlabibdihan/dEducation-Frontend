import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import GlobalContextProvider from "./store/GlobalContextProvider";
import { StyledEngineProvider } from "@mui/material/styles";
export const API_BASE_URL = "http://localhost:5000/api/v1.0.0";
export const COOKIE_AGE = 31536000;
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
