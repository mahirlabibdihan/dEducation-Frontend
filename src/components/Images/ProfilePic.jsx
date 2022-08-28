import React, { useState, useEffect } from "react";
import ProfileController from "../../controller/profileController";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CameraRoundedIcon from "@mui/icons-material/CameraRounded";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import StarIcon from "@mui/icons-material/Star";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import UploadConfirmation from "./UploadConfirmation";
import { Zoom } from "@mui/material";
import { Fade } from "@mui/material";
import "./ProfilePic.scss";
import { API_BASE_URL } from "../..";
const profileController = new ProfileController();

const ProfilePic = () => {
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
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
    if (file !== "") setOpen(true);
    // if (!open) setProfileImage();
  }, [file]);
  return (
    <>
      <Fade in={image !== undefined}>
        <img
          src={`${API_BASE_URL}/assets/images/${
            image === null ? "sample.jpg" : image
          }`}
          // onClick={() => ImageUpload()}
          alt=" "
          className="shadow"
        />
      </Fade>

      <input type="file" onChange={ImageUpload}></input>
      <div className="upload-image-icon">
        <CameraAltIcon sx={{ fontSize: "1.5rem", color: "#fff" }} />
      </div>
      <UploadConfirmation
        open={open}
        setOpen={setOpen}
        onConfirm={setProfileImage}
      />
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
      <Fade in={image !== undefined}>
        <img
          src={`${API_BASE_URL}/assets/images/${
            image === null ? "sample.jpg" : image
          }`}
          // onClick={() => ImageUpload()}
          alt=" "
          className="shadow"
        />
      </Fade>

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
