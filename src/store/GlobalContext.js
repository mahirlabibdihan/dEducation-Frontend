import { createContext } from "react";
const GlobalContext = createContext({
  loggedInAs: "",
  setLoggedInAs: () => {},
  selectedUser: -1,
  setSelectedUser: () => {},
  postId: -1,
  setPostId: () => {},
});
export default GlobalContext;
