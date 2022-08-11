import React, { useState, useContext, useEffect } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CoachingController from "../../controller/coachingController";
import GlobalContext from "../../store/GlobalContext";
const coachingController = new CoachingController();

const ImageUploader = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [file, setFile] = useState("");
  const [image, setImage] = useState(props.coaching.IMAGE);
  const ImageUpload = (e) => {
    setFile(e.target.files[0]);
  };
  const setProfileImage = async () => {
    if (file > "") {
      const formData = new FormData();
      formData.append("file", file);
      const obj = {
        coaching_id: props.coaching.COACHING_ID,
      };
      const json = JSON.stringify(obj);
      const blob = new Blob([json], {
        type: "application/json",
      });
      formData.append("document", blob);
      const res = await coachingController.uploadImage(formData);
      if (res.success) {
        setImage(res.data.image);
        globalCtx.setPendingUpdate(true);
      }
    }
  };
  useEffect(() => {
    setProfileImage();
  }, [file]);
  useEffect(() => {
    setImage(props.coaching.IMAGE);
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
      <input type="file" onChange={ImageUpload}></input>
      <div className="upload-image-icon">
        <CameraAltIcon sx={{ fontSize: "1.5rem", color: "#fff" }} />
      </div>
    </>
  );
};

export default ImageUploader;
