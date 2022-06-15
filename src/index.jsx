import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import AuthContextProvider from "./store/AuthContextProvider";
import { StyledEngineProvider } from "@mui/material/styles";

export const api_base_url = "http://localhost:5000/api/v1.0.0";
const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
