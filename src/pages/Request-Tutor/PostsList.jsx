import React, { useState, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log("EFFECT");
    const getPosts = async () => {
      //   const res = await profileController.getProfile();
      //   setPosts(res.posts);
    };
    getPosts();
  }, []);
  const Post = (props) => {
    const data = props.data;
    return (
      <Grid className="post-container">
        <h3>{data.title}</h3>
        <div className="vbox">
          <div className="hbox">
            <h3>{`Tuition Type: ${data.type}`}</h3>
            <h3>{`Subject: ${data.type}`}</h3>
          </div>
          <div className="hbox">
            <h3>{`Tutoring Days: ${data.days_per_week}`}</h3>
            <h3>{`Salary: ${data.salary}`}</h3>
          </div>
          <div className="hbox">
            <h3>{`Desired Tutor Gender: ${data.desired_tutor_gender}`}</h3>
          </div>
        </div>
      </Grid>
    );
  };
  return (
    <div className="posts-list">
      {posts.map((post, index) => (
        <Post data={post} />
      ))}
    </div>
  );
};

export default PostsList;
