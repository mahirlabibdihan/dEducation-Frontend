import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "../../store/GlobalContext";
import CourseController from "../../controller/courseController";
import CourseContainer from "../../components/Containers/CourseContainer";
import Cookies from "universal-cookie";
import RightPanel from "../../components/Panels/RightPanel";
import MainContainer from "../../components/Containers/MainContainer";
import AddCourseForm from "../../components/Forms/AddCourseForm";
import CreateCourseForm from "../../components/Forms/CreateCourseForm";
import NotificationContainer from "../../components/Containers/NotificationContainer";
import { Divider } from "@mui/material";
import { format } from "date-fns";
const cookies = new Cookies();
const courseController = new CourseController();

const Notifications = () => {
  const globalCtx = useContext(GlobalContext);
  const [notificationList, setNotificationList] = useState([
    {
      TEXT: "Ibrahim shagor has offered you a tution.Ibrahim shagor has offered you a tution.Ibrahim shagor has offered you a tution.",
      URL: "/tuition_offers?id=0",
      IMAGE: "student1.jpg",
      TIMESTAMP: format(
        new Date("2022-08-10 11:14:20"),
        "dd MMM, yyyy hh:mm a"
      ),
    },
    {
      TEXT: "Ibrahim shagor has offered you a tution.Ibrahim shagor has offered you a tution.Ibrahim shagor has offered you a tution.",
      URL: "/tuition_offers?id=0",
      IMAGE: "student1.jpg",
      TIMESTAMP: format(
        new Date("2022-08-10 11:14:20"),
        "dd MMM, yyyy hh:mm a"
      ),
    },
  ]);
  const type = cookies.get("type");
  const setList = async () => {
    // const list = await courseController.getMyListAdmin();
    // setCourseList(list.data);
  };
  useEffect(() => {
    setList();
  }, []);

  const NotificationList = () => {
    return (
      <div className="posts-feed">
        <h2 className="header">Notifications</h2>
        <Divider />
        <NotificationContainer list={notificationList} />
      </div>
    );
  };
  return (
    <MainContainer className="notification-container">
      <NotificationList />
    </MainContainer>
  );
};

export default Notifications;
