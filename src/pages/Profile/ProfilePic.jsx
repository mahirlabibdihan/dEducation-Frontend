import React, { useState, useEffect } from "react";
import ProfileController from "../../controller/profileController";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CameraRoundedIcon from "@mui/icons-material/CameraRounded";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
const profileController = new ProfileController();
const ProfilePic = () => {
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const ImageUpload = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const getProfileData = async () => {
      const data = await profileController.getProfilePicture();
      setImage(data.image);
    };
    getProfileData();
  }, []);
  useEffect(() => {
    console.log("EFFECT");
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
  return (
    <>
      <img
        src={`http://localhost:5000/assets/images/${
          image === null ? "sample.jpg" : image
        }`}
        // onClick={() => ImageUpload()}
        alt=" "
      />
      <input type="file" onChange={ImageUpload}></input>
      <div className="upload-image-icon">
        <CameraAltIcon sx={{ fontSize: "1.5rem", color: "#fff" }} />
      </div>
    </>
  );
};

export default ProfilePic;
