import React, { useState, useEffect, useRef, useContext } from "react";
import Grid from "@mui/material/Grid";
import Layout from "../../components/Layout";
import { Divider, Typography } from "@mui/material";
import ProfileController from "../../controller/profileController";
import ProfileSettings from "./ProfileSettings";
import PasswordChange from "./PasswordChange";
import ProfilePic from "../../components/ProfilePic";
import "./profile.scss";
import GlobalContext from "../../store/GlobalContext";
const profileController = new ProfileController();

// import InputFieldsetName from "../../components/InputField";

const Profile = () => {
  // const [user, setUser] = useState({});
  const globalCtx = useContext(GlobalContext);
  const [name, setName] = useState("");
  const [type, setType] = useState("PRIVATE");
  useEffect(() => {
    console.log("EFFECT");
    const getProfileData = async () => {
      const data = await profileController.getProfile();
      setName(data.NAME);
      // setUser(data);
      console.log("USER: ", data);
      globalCtx.setLoggedInAs(data.TYPE);
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
          <h2 className="">{name}</h2>
          {type === "PUBLIC" ? (
            <div className="full-details">
              <h6>{"Class: "}</h6>
              <h6>{"Institution: "}</h6>
              <h6>{"Gender: "}</h6>
              <h6>{"Phone Number: "}</h6>
              <h6>{"Address: "}</h6>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };
  return (
    // <Layout>
    <Grid className="profile-container ">
      <ProfileSettings />
      <div className="profile-card">
        <ProfileBanner />
        <Divider />
        <PasswordChange />
      </div>
    </Grid>
    // </Layout>
  );
};

export default Profile;
