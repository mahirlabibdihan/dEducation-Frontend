import { createContext } from "react";
const AuthContext = createContext({
  loggedInAs: "",
  setLoggedInAs: () => {},
});
export default AuthContext;
