import React from "react";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import "./home.scss";
import PostsList from "../../components/Containers/TutionPostContainer";
import TutionPostSearchForm from "../../components/Forms/TutionPostSearchForm";
import MainContainer from "../../components/Containers/MainContainer";
import RightPanel from "../../components/Panels/RightPanel";
const SearchFilter = () => {
  return (
    <div className="search-filter">
      <TutionPostSearchForm />
    </div>
  );
};
const TutorHome = () => {
  const PostsFeed = () => {
    return (
      <div className="posts-feed">
        <h2 className="header">Tution Posts</h2>
        <Divider />
        <PostsList />
      </div>
    );
  };
  return (
    <MainContainer className="tutor-home-container">
      <PostsFeed />
      <RightPanel>
        <SearchFilter />
      </RightPanel>
    </MainContainer>
  );
};

export default TutorHome;
