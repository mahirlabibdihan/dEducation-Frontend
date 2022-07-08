import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import ProfileController from "../../controller/profileController";
import ProfileSettings from "./ProfileSettings";
import PasswordChange from "./PasswordChange";
import ProfilePic from "../../components/ProfilePic";
import "./profile.scss";
import GlobalContext from "../../store/GlobalContext";
const profileController = new ProfileController();

const Profile = () => {
  const [user, setUser] = useState({});
  const getProfileData = async () => {
    const data = await profileController.getProfile();
    setUser(data);
  };
  useEffect(() => {
    getProfileData();
  }, []);

  const UserProfile = () => {
    return (
      <div className="profile-banner">
        <div className="profile-picture">
          <ProfilePic image={user.IMAGE} />
        </div>

        <div className="banner-details">
          <h2 className="text-center">{user.NAME}</h2>
        </div>
      </div>
    );
  };
  const RightPanel = () => {
    return (
      <div className="profile-card">
        <UserProfile />
        <Divider />
        <PasswordChange />
      </div>
    );
  };
  return (
    <Grid className="profile-container ">
      <ProfileSettings />
      <RightPanel />
    </Grid>
  );
};

export default Profile;
