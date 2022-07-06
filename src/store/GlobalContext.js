import { createContext } from "react";
const GlobalContext = createContext({
  loggedInAs: "",
  setLoggedInAs: () => {},
  selectedIndex: -1,
  setSelectedIndex: () => {},
  postId: -1,
  setPostId: () => {},
});
export default GlobalContext;
