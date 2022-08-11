import React from "react";
import { Divider } from "@mui/material";
import RequestForm from "../../components/Forms/RequestForm";
import PostsList from "../../components/Containers/TutionPostContainer";
import MainContainer from "../../components/Containers/MainContainer";
import RightPanel from "../../components/Panels/RightPanel";

const RequestTutor = () => {
  const PostsFeed = () => {
    return (
      <div className="posts-feed">
        <h2 className="header">Previous Requests</h2>
        <Divider />
        <PostsList />
      </div>
    );
  };
  return (
    <MainContainer className="tutor-request-container">
      <PostsFeed />
      <RightPanel>
        <RequestForm />
      </RightPanel>
    </MainContainer>
  );
};

export default RequestTutor;
