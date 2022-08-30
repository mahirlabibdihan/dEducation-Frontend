import React from "react";
import LeftPanel from "../Panels/LeftPanel";

const Layout = (props) => {
  return (
    <div className="layout-container">
      <div className="body">
        <LeftPanel />
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
};
export default Layout;
