import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import MainContainer from "../../components/Containers/MainContainer";
import RightPanel from "../../components/Panels/RightPanel";
import NoticeContainer from "../../components/Containers/NoticeContainer";
import NoticeForm from "../../components/Forms/NoticeForm";
import Cookies from "universal-cookie";
import CoachingController from "../../controller/coachingController";
import GlobalContext from "../../store/GlobalContext";
import { useContext } from "react";
import SearchBar from "../../components/InputFields/SearchBar";
const coachingController = new CoachingController();
const NoticeList = ({ list }) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="posts-feed">
      <div className="header-container">
        <h2 className="header">Notice Board</h2>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          label="Search by coaching"
        />
      </div>
      <Divider />
      <NoticeContainer list={list} query={searchQuery} />
    </div>
  );
};
const NoticeBoard = () => {
  const cookies = new Cookies();
  const type = cookies.get("type");

  const globalCtx = useContext(GlobalContext);
  const [notices, setNotices] = useState([]);
  const setNoticeLists = async () => {
    const res = await coachingController.getMyNotices();
    setNotices(res.data);
  };
  useEffect(() => {
    setNoticeLists();
  }, []);
  useEffect(() => {
    if (globalCtx.pendingUpdate) {
      setNoticeLists();
      globalCtx.setPendingUpdate(false);
    }
  }, [globalCtx.pendingUpdate]);

  return (
    <MainContainer className="tutor-home-container">
      <NoticeList list={notices} />
      <RightPanel>{type === "TUTOR" ? <NoticeForm /> : <></>}</RightPanel>
    </MainContainer>
  );
};

export default NoticeBoard;
