import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Sidebar } from "../../components";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import Layout from "../../components/Layout";
import { Divider, Typography } from "@mui/material";
import { FormControl, OutlinedInput, InputLabel } from "@mui/material";
import InputField from "../../components/InputField";
import { Button } from "@mui/material";
import { getProfile } from "../../api/profile";
import { uploadImage } from "../../api/profile";
// import InputField from "../../components/InputField";
import "./profile.scss";
const Login = () => {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  // const params = useParams();
  useEffect(() => {
    const getProfileData = async () => {
      const data = await getProfile();
      if (data.success === true) {
        setName(data.name);
        setImage(data.image);
      }
    };
    getProfileData();
  }, []);

  useEffect(() => {
    const setProfileImage = async () => {
      if (file > "") {
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        const result = await uploadImage(formData);
        if (result.success) {
          const data = await getProfile();
          if (data.success === true) {
            console.log(data);
            setName(data.name);
            setImage(data.image);
          }
        }
      }
    };
    setProfileImage();
  }, [file]);

  const ImageUpload = (e) => {
    setFile(e.target.files[0]);
    // console.log(formData.files.file.name);
  };
  return (
    <Layout>
      <Grid className="profile-container ">
        <div className="profile-card">
          <div className="profile-banner">
            <div className="profile-picture">
              <img
                src={`http://localhost:5000/assets/images/${image}`}
                // http://localhost:5000/assets/images/dihan.jpg
                onClick={() => ImageUpload()}
                alt="Admin"
                // width="140"/
              />
              <input type="file" onChange={ImageUpload}></input>
            </div>

            <div className="banner-details">
              <h1 className="">{name}</h1>
            </div>
          </div>
          <Divider />
          <div className="password-change">
            {/* <h1 className="header">Change Password</h1> */}
            {/* <Divider /> */}
            <div className="input-fields">
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
