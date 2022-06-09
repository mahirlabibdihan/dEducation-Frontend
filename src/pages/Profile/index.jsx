import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Sidebar } from "../../components";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Layout from "../../components/Layout";
import { Divider } from "@mui/material";
import { FormControl, OutlinedInput, InputLabel } from "@mui/material";
import InputField from "../../components/InputField";
import { Button } from "@mui/material";
// import InputField from "../../components/InputField";
import "./profile.scss";
const Login = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  // const params = useParams();
  return (
    <Layout>
      <Grid className="profile-container ">
        <div className="profile-card">
          <div className="profile-banner">
            <div className="profile-picture">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="Admin"
                width="140"
              />
            </div>
            <div className="banner-details">
              <h1>"user.username"</h1>
            </div>
          </div>
          <Divider />
          <div className="password-change">
            {["Current Password", "New Password", "Confirm New Password"].map(
              (text, index) => (
                <InputField
                  label={text}
                  type="text"
                  value={name}
                  setValue={setName}
                />
              )
            )}
          </div>
          <Button className="save-button">Change</Button>
        </div>
        <div className="profile-details">
          <h1 className="header">Profile Settings</h1>
          <Divider />
          <div className="input-fields">
            {[
              "Full Name",
              "Email Address",
              "Phone Number",
              "Institution",
              "City",
              "District",
            ].map((text, index) => (
              <InputField
                label={text}
                type="text"
                value={name}
                setValue={setName}
              />
            ))}
          </div>
          <Button variant="contained" className="save-button">
            Save
          </Button>
        </div>
      </Grid>
    </Layout>
  );
};

export default Login;
