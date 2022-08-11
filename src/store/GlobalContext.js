import { createContext } from "react";
const GlobalContext = createContext({
  pendingUpdate: false,
  setPendingUpdate: () => {},
});
export default GlobalContext;
