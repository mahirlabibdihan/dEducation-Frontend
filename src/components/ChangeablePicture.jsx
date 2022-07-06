import React, { useState, useEffect } from "react";
import ProfileController from "../controller/profileController";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "./ProfilePic.scss";
const profileController = new ProfileController();
const ChangeablePicture = (props) => {
  const [file, setFile] = useState("");
  const ImageUpload = (e) => {
    setFile(e.target.files[0]);
  };
  const setProfilePicture = async () => {
    if (file > "") {
      const formData = new FormData();
      formData.append("file", file);
      const result = await profileController.uploadImage(formData);
      if (result.success) {
        props.setImage(result.image);
      }
    }
  };
  useEffect(() => {
    setProfilePicture();
  }, [file]);
  return (
    <>
      <img
        src={`http://localhost:5000/assets/images/${
          props.image === undefined ? "sample.jpg" : props.image
        }`}
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

export default ChangeablePicture;
