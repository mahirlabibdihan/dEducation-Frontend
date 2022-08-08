import React, { useState, useRef } from "react";
import GlobalContext from "./GlobalContext";
const GlobalContextProvider = (props) => {
  // const [loggedInAs, setLoggedInAs] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [postId, setPostId] = useState(-1);
  const [courseId, setCourseId] = useState(-1);
  const [pendingUpdate, setPendingUpdate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const selected = useRef(-1);
  const val = {
    // loggedInAs,
    // setLoggedInAs,
    selectedIndex,
    setSelectedIndex,
    // postId,
    // setPostId,
    // courseId,
    // setCourseId,
    pendingUpdate,
    setPendingUpdate,
    selected,
    searchQuery,
    setSearchQuery,
  };
  return (
    <GlobalContext.Provider value={val}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
