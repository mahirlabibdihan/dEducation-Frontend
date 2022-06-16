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
const authController = new AuthController();
const profileController = new ProfileController();
// import InputField from "../../components/InputField";

const Profile = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    gender: "",
    dob: "",
    institution: "",
    phone: "",
    city: "",
    district: "",
  });

  // const [profile, setProfile] = useState({
  //   name: "",
  //   file: "",
  //   image: "",
  //   currPass: "",
  //   newPass: "",
  //   currShowPass: "",
  //   district: "",
  // });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  var displayName = useRef("");
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [currShowPass, setCurrShowPass] = useState(false);
  const [newShowPass, setNewShowPass] = useState(false);
  // const params = useParams();
  useEffect(() => {
    const getProfileData = async () => {
      const data = await profileController.getProfile();
      displayName.current = data.name;
      setName(data.name);
      setImage(data.image);
    };
    getProfileData();
  }, []);

  useEffect(() => {
    const setProfileImage = async () => {
      if (file > "") {
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        console.log("Upload request");
        const result = await profileController.uploadImage(formData);
        console.log(result);
        if (result.success) {
          setImage(result.image);
        }
      }
    };
    setProfileImage();
  }, [file]);

  const ImageUpload = (e) => {
    setFile(e.target.files[0]);
    // console.log(formData.files.file.name);
  };
  const changePass = async (e) => {
    const result = await authController.changePass(currPass, newPass);
    if (result) {
      setCurrPass("");
      setNewPass("");
    }
  };
  const PasswordChange = () => {
    return (
      <div className="password-change">
        {/* <h1 className="header">Change Password</h1> */}
        {/* <Divider /> */}
        <div className="input-fields">
          {[
            {
              label: "Current Password",
              value: currPass,
              setValue: setCurrPass,
              showPassword: newShowPass,
              setShowPassword: setNewShowPass,
            },
            {
              label: "New Password",
              value: newPass,
              setValue: setNewPass,
              showPassword: currShowPass,
              setShowPassword: setCurrShowPass,
            },
          ].map((field, index) => (
            <InputField
              label={field.label}
              type={field.showPassword ? "text" : "password"}
              value={field.value}
              setValue={field.setValue}
              endAdornment={
                <EyeIcon
                  isVisible={field.value.length > 0}
                  showPassword={field.showPassword}
                  setShowPassword={field.setShowPassword}
                />
              }
            />
          ))}
        </div>
        <Button className="save-button" onClick={changePass}>
          Change
        </Button>
      </div>
    );
  };
  const ProfileSettings = () => {
    return (
      <div className="profile-details">
        <h1 className="header">Profile Settings</h1>
        <Divider />
        <div className="input-fields">
          {[
            {
              label: "Full Name",
              id: "name",
              value: values.name,
            },
            {
              label: "Gender",
              id: "gender",
              value: values.gender,
            },
            {
              label: "Date Of Birth",
              id: "dob",
              value: values.dob,
            },
            {
              label: "Institution",
              id: "institution",
              value: values.institution,
            },
            {
              label: "Phone Number",
              id: "phone",
              value: values.phone,
            },
            {
              label: "City",
              id: "city",
              value: values.city,
            },
            {
              label: "District",
              id: "ditrict",
              value: values.district,
            },
          ].map((field, index) => (
            <InputField2
              label={field.label}
              type="text"
              value={field.value}
              id={field.id}
              onChange={handleChange}
            />
          ))}
        </div>
        <Button variant="contained" className="save-button">
          Save
        </Button>
      </div>
    );
  };
  const ProfileBanner = () => {
    return (
      <div className="profile-banner">
        <div className="profile-picture">
          <img
            src={`http://localhost:5000/assets/images/${image}`}
            onClick={() => ImageUpload()}
            alt=" "
          />
          <input type="file" onChange={ImageUpload}></input>
        </div>

        <div className="banner-details">
          <h1 className="">{displayName.current}</h1>
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
