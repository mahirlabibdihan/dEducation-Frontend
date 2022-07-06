import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import "./home.scss";
import PostsList from "./PostsList";
import SearchBox from "./SearchBox";

// import InputField from "../../components/InputField";

const TutorHome = () => {
  const [type, setType] = useState("STUDENT");
  useEffect(() => {
    console.log("ON MOUNT");
  }, []);
  const PostsFeed = () => {
    return (
      <div className="posts-feed">
        <h2 className="header">Tution Posts</h2>
        <Divider />
        <PostsList />
      </div>
    );
  };
  // const DashBoard = () => {};
  const SearchFilter = () => {
    return (
      <div className="search-filter">
        <SearchBox />
      </div>
    );
  };
  const RightPanel = () => {
    return (
      <div className="right-panel">
        <SearchFilter />
      </div>
    );
  };
  return (
    <Grid className="tutor-home-container">
      <PostsFeed />
      <RightPanel />
    </Grid>
  );
};

export default TutorHome;
