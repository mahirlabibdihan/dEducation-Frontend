import React, { useState, useEffect } from "react";
import ProfileController from "../../controller/profileController";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CameraRoundedIcon from "@mui/icons-material/CameraRounded";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import StarIcon from "@mui/icons-material/Star";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./ProfilePic.scss";

const profileController = new ProfileController();
const ProfilePic = () => {
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const ImageUpload = (e) => {
    setFile(e.target.files[0]);
  };
  const setProfilePicture = async () => {
    const res = await profileController.getProfilePicture();
    if (res.success) setImage(res.image);
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
      const res = await profileController.uploadImage(formData);
      console.log("IMAGE", res);
      if (res.success) {
        setImage(res.data.image);
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
  const [image, setImage] = useState(props.image);
  useEffect(() => {
    setImage(props.image);
  }, [props]);
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
      {props.rating !== undefined ? (
        <div className="avg-rating">
          {/* <StarIcon sx={{ color: "orange" }} /> */}
          <FontAwesomeIcon icon={faStar} style={{ color: "orange" }} />
          {props.rating === -1 ? "N/A" : Math.round(props.rating * 100) / 100}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default ProfilePic;
