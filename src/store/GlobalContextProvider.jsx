import React, { useState, useRef } from "react";
import GlobalContext from "./GlobalContext";
const GlobalContextProvider = (props) => {
  const [pendingUpdate, setPendingUpdate] = useState(false);
  const [newNotificationFlag, setNewNotificationFlag] = useState(false);
  const [notificationUpdate, setNotificationUpdate] = useState(false);
  const val = {
    pendingUpdate,
    setPendingUpdate,
    newNotificationFlag,
    setNewNotificationFlag,
    notificationUpdate,
    setNotificationUpdate,
  };
  return (
    <GlobalContext.Provider value={val}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
