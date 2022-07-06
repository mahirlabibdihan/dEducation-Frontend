import React, { useState, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import TutionPost from "../../components/TutionPost";
import TutionController from "../../controller/tutionController";
const tutionController = new TutionController();
const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const setTutionPosts = async () => {
    const res = await tutionController.getMyList();
    setPosts(res.data);
  };
  useEffect(() => {
    setTutionPosts();
  }, []);
  return (
    <div className="posts-list">
      {posts.map((post, index) => (
        <TutionPost data={post} />
      ))}
    </div>
  );
};

export default PostsList;
