import React, { useState, useEffect } from "react";
import ProfileController from "../controller/profileController";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CameraRoundedIcon from "@mui/icons-material/CameraRounded";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "./ProfilePic.scss";
const profileController = new ProfileController();
const ProfilePic = () => {
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const ImageUpload = (e) => {
    setFile(e.target.files[0]);
  };
  const setProfilePicture = async () => {
    const result = await profileController.getProfilePicture();
    if (result.success) setImage(result.image);
  };
  useEffect(() => {
    setProfilePicture();
  }, []);
  const setProfileImage = async () => {
    if (file > "") {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);
      console.log("Upload request");
      const result = await profileController.uploadImage(formData);
      console.log("IMAGE", result);
      if (result.success) {
        setImage(result.data.image);
      }
    }
  };
  useEffect(() => {
    setProfileImage();
  }, [file]);
  return (
    <>
      <img
        src={`http://localhost:5000/assets/images/${
          image === null ? "sample.jpg" : image
        }`}
        // onClick={() => ImageUpload()}
        alt=" "
        className="shadow"
      />
      <input type="file" onChange={ImageUpload}></input>
      <div className="upload-image-icon">
        <CameraAltIcon sx={{ fontSize: "1.5rem", color: "#fff" }} />
      </div>
    </>
  );
};

export const PublicProfilePic = (props) => {
  const [image, setImage] = useState("");
  useEffect(() => {
    setImage(props.image);
  }, []);
  return (
    <>
      <img
        src={`http://localhost:5000/assets/images/${
          image === null ? "sample.jpg" : image
        }`}
        // onClick={() => ImageUpload()}
        alt=" "
        className="shadow"
      />
    </>
  );
};
export default ProfilePic;
