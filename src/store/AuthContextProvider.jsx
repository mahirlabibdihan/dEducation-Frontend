import React, { useState } from "react";
import AuthContext from "./auth-context";
const AuthContextProvider = (props) => {
  const [user, setUser] = useState({
    username: "",
  });
  const val = {
    user,
    setUser,
  };
  return (
    <AuthContext.Provider value={val}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
