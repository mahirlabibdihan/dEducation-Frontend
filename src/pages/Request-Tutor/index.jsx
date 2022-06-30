import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import RequestForm from "./RequestForm";
import PostsList from "./PostsList";
import "./request-tutor.scss";

// import InputField from "../../components/InputField";

const RequestTutor = () => {
  useEffect(() => {
    console.log("ON MOUNT");
  }, []);

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
    // <Layout>
    <Grid className="tutor-request-container">
      <PostsFeed />
      <PostRequest />
    </Grid>
    // </Layout>
  );
};

export default RequestTutor;
