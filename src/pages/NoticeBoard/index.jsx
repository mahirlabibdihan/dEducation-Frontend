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
const NoticeBoard = () => {
  const cookies = new Cookies();
  const type = cookies.get("type");
  const [notices, setNotices] = useState([
    {
      TEXT: "No classes this week.No classes this week.No classes this week.No classes this week.No classes this week.",
      IMAGE: "student1.jpg",
      NAME: "Mahir Labib Dihan",
      TIMESTAMP: format(
        new Date("2022-08-10 11:14:20"),
        "dd MMM, yyyy hh:mm a"
      ),
    },
    {
      TEXT: "No classes this week.No classes this week.No classes this week.No classes this week.No classes this week.",
      IMAGE: "student1.jpg",
      NAME: "Mahir Labib Dihan",
      TIMESTAMP: format(
        new Date("2022-08-10 11:14:20"),
        "dd MMM, yyyy hh:mm a"
      ),
    },
  ]);
  const setNoticeLists = async () => {
    // const res = await tutionController.getList();
    // setNotices(res.data);
  };
  useEffect(() => {
    setNoticeLists();
  }, []);
  const NoticeList = () => {
    return (
      <div className="posts-feed">
        <h2 className="header">Notice Board</h2>
        <Divider />
        <NoticeContainer list={notices} />
      </div>
    );
  };
  return (
    <MainContainer className="tutor-home-container">
      <NoticeList list={notices} />
      <RightPanel>{type === "TUTOR" ? <NoticeForm /> : <></>}</RightPanel>
    </MainContainer>
  );
};

export default NoticeBoard;
