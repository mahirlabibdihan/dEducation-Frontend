import React, { useState } from "react";
import GlobalContext from "./GlobalContext";
const GlobalContextProvider = (props) => {
  // const [loggedInAs, setLoggedInAs] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [postId, setPostId] = useState(-1);
  const [courseId, setCourseId] = useState(-1);
  const [pendingUpdate, setPendingUpdate] = useState(false);
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
  };
  return (
    <GlobalContext.Provider value={val}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
