import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import GlobalContextProvider from "./store/GlobalContextProvider";
import { StyledEngineProvider } from "@mui/material/styles";
// const { readFileSync } = require("fs");
let API_BASE_URL = "http://localhost:5000";
// let API_BASE_URL = "https://2266-45-127-245-12.ap.ngrok.io";
export const COOKIE_AGE = 31536000;
const root = ReactDOM.createRoot(document.getElementById("root"));

// function syncReadFile(filename) {
//   const contents = readFileSync("../api.txt", "utf-8");

//   const arr = contents.split(/\r?\n/);
//   console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']
//   return arr;
// }
// syncReadFile("./example.txt");
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);

export { API_BASE_URL };
