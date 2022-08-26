import React, { useState, useContext, useEffect } from "react";
import { Button } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CoachingController from "../../controller/coachingController";
import GlobalContext from "../../store/GlobalContext";
import { CoachingFields } from "../InputFields";
import "./styles.scss";
import ImageUploader from "../Images/ImageUploader";
import { Zoom } from "@mui/material";
const coachingController = new CoachingController();

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
      <CoachingFields values={values} handleChange={handleChange} />
      <Button
        variant="contained"
        className="blue-button full-width"
        onClick={updateCoaching}
      >
        Save
      </Button>
    </div>
  );
};
export const TutorCoachingPanel = (props) => {
  return (
    <Zoom in={true}>
      <div className="tutor-coaching-panel">
        {props.coaching === undefined ? (
          <></>
        ) : (
          <EditCoaching coaching={props.coaching} />
        )}
      </div>
    </Zoom>
  );
};

// export default CoachingPanel;
