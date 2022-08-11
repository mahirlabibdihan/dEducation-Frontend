import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import ProfileController from "../../controller/profileController";
import ProfileSettings from "./ProfileSettings";
import PasswordChangeForm from "../../components/Forms/PasswordChangeForm";
import ProfilePic from "../../components/Images/ProfilePic";
import RightPanel from "../../components/Panels/RightPanel";
import "./profile.scss";
const profileController = new ProfileController();

const Profile = () => {
  const [user, setUser] = useState({});
  const getProfileData = async () => {
    const res = await profileController.getProfile();
    setUser(res.data);
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
  const Right = () => {
    return (
      <RightPanel>
        <div className="profile-card">
          <UserProfile />
          <Divider />
          <PasswordChangeForm />
        </div>
      </RightPanel>
    );
  };
  return (
    <Grid className="profile-container ">
      <ProfileSettings />
      <Right />
    </Grid>
  );
};

export default Profile;
