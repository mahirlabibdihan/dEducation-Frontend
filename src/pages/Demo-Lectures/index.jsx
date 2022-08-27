import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import PostsList from "../../components/Containers/TutionPostContainer";
import TutionPostSearchForm from "../../components/Forms/TutionPostSearchForm";
import MainContainer from "../../components/Containers/MainContainer";
import RightPanel from "../../components/Panels/RightPanel";
import NoticeContainer from "../../components/Containers/NoticeContainer";
import { format } from "date-fns";
import NoticeForm from "../../components/Forms/NoticeForm";
import Cookies from "universal-cookie";
import CoachingController from "../../controller/coachingController";
import GlobalContext from "../../store/GlobalContext";
import { useContext } from "react";
import SearchBar from "../../components/InputFields/SearchBar";
import TutorsController from "../../controller/tutorsController";
import VideoContainer from "../../components/Containers/VideoContainer";
import LectureForm from "../../components/Forms/LectureForm";
const tutorsController = new TutorsController();
const coachingController = new CoachingController();
const VideoList = ({ list }) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="posts-feed">
      <div className="header-container">
        <h2 className="header">Demo Lectures</h2>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          label="Search by name"
        />
      </div>
      <Divider />
      <VideoContainer list={list} query={searchQuery} />
    </div>
  );
};
const DemoLectures = () => {
  const cookies = new Cookies();
  const type = cookies.get("type");

  const globalCtx = useContext(GlobalContext);
  const [materials, setMaterials] = useState([]);
  const setMaterialList = async () => {
    const res =
      type === "TUTOR"
        ? await tutorsController.getMyMaterials()
        : await tutorsController.getAllMaterials();
    setMaterials(res.data);
    // console.log(res.data);
  };
  useEffect(() => {
    setMaterialList();
  }, []);
  useEffect(() => {
    if (globalCtx.pendingUpdate) {
      setMaterialList();
      globalCtx.setPendingUpdate(false);
    }
  }, [globalCtx.pendingUpdate]);

  return (
    <MainContainer className="playlist-container">
      <VideoList list={materials} />
      <RightPanel>{type === "TUTOR" ? <LectureForm /> : <></>}</RightPanel>
    </MainContainer>
  );
};

export default DemoLectures;
