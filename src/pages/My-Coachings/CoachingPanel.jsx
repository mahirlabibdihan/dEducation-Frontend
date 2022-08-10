import React, { useState, useContext, useEffect } from "react";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import { PublicProfilePic } from "../../components/ProfilePic";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CoachingController from "../../controller/coachingController";
import GlobalContext from "../../store/GlobalContext";
import { InputField2, MultiLineField } from "../../components/InputField";
import "./my-coachings.scss";
const coachingController = new CoachingController();

const ImageUploader = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [file, setFile] = useState("");
  const [image, setImage] = useState(props.coaching.IMAGE);
  const ImageUpload = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    // console.log("EFFECT");
    const setProfileImage = async () => {
      if (file > "") {
        console.log(file);
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
        // formData.append("coaching_id", JSON.stringify(props.coaching));
        console.log("Upload request", formData.file);
        const res = await coachingController.uploadImage(formData);
        console.log(res);
        if (res.success) {
          setImage(res.data.image);
          globalCtx.setPendingUpdate(true);
        }
      }
    };
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
const EditCoaching = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [values, setValues] = useState({
    name: props.coaching.NAME,
    phone: props.coaching.PHONE_NUMBER,
    address: props.coaching.ADDRESS,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  useEffect(() => {
    setValues({
      name: props.coaching.NAME,
      phone: props.coaching.PHONE_NUMBER,
      address: props.coaching.ADDRESS,
    });
  }, [props]);
  const updateCoaching = async (event) => {
    const res = await coachingController.updateInfo(
      values,
      props.coaching.COACHING_ID
    );
    if (res.success) {
      globalCtx.setPendingUpdate(true);
    }
  };
  return (
    <div className="coaching-banner">
      <div className="profile-picture">
        <ImageUploader coaching={props.coaching} />
      </div>
      {/* <Divider /> */}
      <div className="input-fields">
        {[
          {
            label: "Full Name",
            id: "name",
            value: values.name,
          },
          {
            label: "Phone Number",
            id: "phone",
            value: values.phone,
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
        <MultiLineField
          rows={3}
          label={"Address"}
          type="text"
          value={values.address}
          id={"address"}
          onChange={handleChange}
        />
      </div>
      <Button
        variant="contained"
        className="update-button"
        onClick={updateCoaching}
      >
        Save
      </Button>
    </div>
  );
};
export const TutorCoachingPanel = (props) => {
  return (
    <div className="tutor-coaching-panel">
      {props.coaching === undefined ? (
        <></>
      ) : (
        <EditCoaching coaching={props.coaching} />
      )}
    </div>
  );
};

// export default CoachingPanel;
