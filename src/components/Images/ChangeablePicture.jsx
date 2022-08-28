import React, { useState, useEffect } from "react";
import ProfileController from "../../controller/profileController";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "./ProfilePic.scss";
import { API_BASE_URL } from "../..";
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
      const res = await profileController.uploadImage(formData);
      if (res.success) {
        props.setImage(res.image);
      }
    }
  };
  useEffect(() => {
    setProfilePicture();
  }, [file]);
  return (
    <>
      <img
        src={`${API_BASE_URL}/assets/images/${
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
