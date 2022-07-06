import React, { useState } from "react";
import GlobalContext from "./GlobalContext";
const GlobalContextProvider = (props) => {
  const [loggedInAs, setLoggedInAs] = useState("");
  const [selectedUser, setSelectedUser] = useState(-1);
  const [postId, setPostId] = useState(-1);
  const val = {
    loggedInAs,
    setLoggedInAs,
    selectedUser,
    setSelectedUser,
    postId,
    setPostId,
  };
  return (
    <GlobalContext.Provider value={val}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
