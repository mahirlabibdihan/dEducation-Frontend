import { createContext } from "react";
const GlobalContext = createContext({
  // loggedInAs: "",
  // setLoggedInAs: () => {},
  selectedIndex: -1,
  setSelectedIndex: () => {},
  // postId: -1,
  // setPostId: () => {},
  // courseId: -1,
  // setCourseId: () => {},
  pendingUpdate: false,
  setPendingUpdate: () => {},
  selected: -1,
  searchQuery: "",
  setSearchQuery: () => {},
});
export default GlobalContext;
