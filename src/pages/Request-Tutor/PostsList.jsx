import React, { useState, useEffect, useContext } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import TutionPost from "../../components/TutionPost";
import TutionController from "../../controller/tutionController";
import GlobalContext from "../../store/GlobalContext";
const tutionController = new TutionController();
const PostsList = () => {
  const globalCtx = useContext(GlobalContext);
  const [posts, setPosts] = useState([]);
  const setTutionPosts = async () => {
    const res = await tutionController.getMyList();
    setPosts(res.data);
  };
  useEffect(() => {
    setTutionPosts();
  }, []);
  useEffect(() => {
    if (globalCtx.pendingUpdate) {
      setTutionPosts();
      globalCtx.setPendingUpdate(false);
    }
  }, [globalCtx.pendingUpdate]);
  return (
    <div className="posts-list">
      {posts.map((post, index) => (
        <TutionPost data={post} />
      ))}
    </div>
  );
};

export default PostsList;
