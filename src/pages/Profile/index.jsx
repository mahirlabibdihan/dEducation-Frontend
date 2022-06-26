import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import Layout from "../../components/Layout";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import EyeIcon from "../../components/EyeIcon";
import "./profile.scss";
import AuthController from "../../controller/authController";
import ProfileController from "../../controller/profileController";
import ProfileSettings from "./ProfileSettings";
import PasswordChange from "./PasswordChange";
import ProfilePic from "./ProfilePic";
const authController = new AuthController();
const profileController = new ProfileController();
// import InputField from "../../components/InputField";

const Profile = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    console.log("EFFECT");
    const getProfileData = async () => {
      const data = await profileController.getProfile();
      setName(data.name);
    };
    getProfileData();
  }, []);

  const ProfileBanner = () => {
    return (
      <div className="profile-banner">
        <div className="profile-picture">
          <ProfilePic />
        </div>

        <div className="banner-details">
          <h1 className="">{name}</h1>
        </div>
      </div>
    );
  };
  return (
    <Layout>
      <Grid className="profile-container ">
        <div className="profile-card">
          <ProfileBanner />
          <Divider />
          <PasswordChange />
        </div>
        <ProfileSettings />
      </Grid>
    </Layout>
  );
};

export default Profile;
