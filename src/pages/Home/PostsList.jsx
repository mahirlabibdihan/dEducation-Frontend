import React, { useState, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import TutionPost from "../../components/TutionPost";
import TutionController from "../../controller/tutionController";
import { useContext } from "react";
import GlobalContext from "../../store/GlobalContext";
const tutionController = new TutionController();
const PostsList = () => {
  const globalCtx = useContext(GlobalContext);
  const [posts, setPosts] = useState([]);
  const [isApplied, setIsAppled] = useState([]);
  const setTutionPosts = async () => {
    const res = await tutionController.getList();
    setPosts(res.data);
    const res2 = await tutionController.getApplyList();
    setIsAppled(res2.data);
    console.log(res2.data);
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
        <TutionPost data={post} isApplied={isApplied[index]} />
      ))}
    </div>
  );
};

export default PostsList;
