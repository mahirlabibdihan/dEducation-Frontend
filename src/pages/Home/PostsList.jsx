import React, { useState, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import TutionPost from "../../components/TutionPost";
import TutionController from "../../controller/tutionController";
import { useContext } from "react";
import GlobalContext from "../../store/GlobalContext";
import { useSearchParams } from "react-router-dom";
const tutionController = new TutionController();
const PostsList = () => {
  const globalCtx = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [isApplied, setIsApplied] = useState([]);
  const setTutionPosts = async () => {
    const res = await tutionController.getList();
    setPosts(res.data);
    const res2 = await tutionController.getApplyList();
    setIsApplied(res2.data);
    console.log(res2.data);
  };
  useEffect(() => {
    if (searchParams.get("gender") === null) {
      setTutionPosts();
    } else {
      console.log("REQ FILTER");
      setFilteredList();
    }
  }, []);
  const setFilteredList = async () => {
    const data = {
      gender: searchParams.get("gender"),
      start_salary: searchParams.get("start"),
      end_salary: searchParams.get("end"),
      days_per_week: searchParams.get("days"),
      version: searchParams.get("version"),
      type: searchParams.get("type"),
    };
    const res = await tutionController.getFilteredList(data);
    setPosts(res.data);
    const res2 = await tutionController.getFilteredApplyList(data);
    setIsApplied(res2.data);
  };
  useEffect(() => {
    if (globalCtx.pendingUpdate) {
      if (searchParams.get("gender") === null) {
        setTutionPosts();
      } else {
        console.log("REQ FILTER");
        setFilteredList();
      }
      globalCtx.setPendingUpdate(false);
    }
  }, [searchParams, globalCtx.pendingUpdate]);
  return (
    <div className="posts-list">
      {posts.map((post, index) => (
        <TutionPost data={post} isApplied={isApplied[index]} />
      ))}
    </div>
  );
};

export default PostsList;
