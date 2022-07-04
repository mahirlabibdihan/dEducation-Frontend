import { createContext } from "react";
const GlobalContext = createContext({
  loggedInAs: "",
  setLoggedInAs: () => {},
  selectedUser: -1,
  setSelectedUser: () => {},
});
export default GlobalContext;
