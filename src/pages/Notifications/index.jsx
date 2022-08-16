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
import ProfileController from "../../controller/profileController";
// import { setNotification } from "../../components/Containers/Layout";

const cookies = new Cookies();
const courseController = new CourseController();
const profileController = new ProfileController();
const Notifications = () => {
  const globalCtx = useContext(GlobalContext);
  const [notificationList, setNotificationList] = useState([]);
  const type = cookies.get("type");
  const setList = async () => {
    const list = await profileController.getNotifications();
    setNotificationList(list.data);
    await profileController.seenNotifications();
    globalCtx.setNewNotificationFlag(false);
    // console.log(list.data);
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
