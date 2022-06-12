import React, { useState } from "react";
import AuthContext from "./AuthContext";
const AuthContextProvider = (props) => {
  const [loggedInAs, setLoggedInAs] = useState("");
  const val = {
    loggedInAs,
    setLoggedInAs,
  };
  return (
    <AuthContext.Provider value={val}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
