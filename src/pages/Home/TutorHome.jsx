import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import "./home.scss";
import PostsList from "../../components/Containers/TutionPostContainer";
import TutionPostSearchForm from "../../components/Forms/TutionPostSearchForm";
import MainContainer from "../../components/Containers/MainContainer";
import RightPanel from "../../components/Panels/RightPanel";
import SearchBar from "../../components/InputFields/SearchBar";
const SearchFilter = () => {
  return (
    <div className="search-filter">
      <TutionPostSearchForm />
    </div>
  );
};
const TutorHome = () => {
  const PostsFeed = () => {
    const [searchQuery, setSearchQuery] = useState("");
    return (
      <div className="posts-feed">
        <div className="header-container">
          <h2 className="header">Tution Posts</h2>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            label="Search by location"
          />
        </div>
        <Divider />
        <PostsList query={searchQuery} />
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
