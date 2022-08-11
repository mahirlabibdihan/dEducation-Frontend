import React, { useState, useRef } from "react";
import GlobalContext from "./GlobalContext";
const GlobalContextProvider = (props) => {
  const [pendingUpdate, setPendingUpdate] = useState(false);
  const val = {
    pendingUpdate,
    setPendingUpdate,
  };
  return (
    <GlobalContext.Provider value={val}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
