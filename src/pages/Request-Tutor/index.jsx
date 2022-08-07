import React from "react";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import RequestForm from "./RequestForm";
import PostsList from "./PostsList";
import "./request-tutor.scss";

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

  const PostRequest = () => {
    return (
      <div className="post-request">
        <RequestForm />
      </div>
    );
  };
  return (
    <Grid className="tutor-request-container">
      <PostsFeed />
      <PostRequest />
    </Grid>
  );
};

export default RequestTutor;
