import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "../../store/GlobalContext";
import MainContainer from "../../components/Containers/MainContainer";
import NotificationContainer from "../../components/Containers/NotificationContainer";
import Divider from "@mui/material/Divider";
import ProfileController from "../../controller/profileController";
const profileController = new ProfileController();
const Notifications = () => {
  const globalCtx = useContext(GlobalContext);
  const [notificationList, setNotificationList] = useState([]);
  const setList = async () => {
    const list = await profileController.getNotifications();
    setNotificationList(list.data);
    await profileController.seenNotifications();
    globalCtx.setNewNotificationFlag(false);
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
