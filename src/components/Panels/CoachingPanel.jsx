import React, { useContext, useState } from "react";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import GlobalContext from "../../store/GlobalContext";
import { PublicProfilePic } from "../Images/ProfilePic";
import CoachingController from "../../controller/coachingController";
import Cookies from "universal-cookie";
import "./CoachingPanel.scss";
import { CoachingCoursesTable } from "../Tables/Tables";
import { useEffect } from "react";
import Rating from "@mui/material/Rating";
import { Zoom } from "@mui/material";
const coachingController = new CoachingController();
const cookies = new Cookies();

const CoachingBanner = (props) => {
  return (
    <div className="profile-banner">
      <div className="profile-picture">
        <PublicProfilePic image={props.coaching.IMAGE} />
      </div>
      <div className="banner-details">
        <h3 className="">{props.coaching.NAME}</h3>
        <Divider />
        <h6 className="poppins-font">
          <b>{`Phone Number: `}</b> {`${props.coaching.PHONE_NUMBER}`}
        </h6>
        <h6 className="poppins-font">
          <b>{`Address: `}</b>
          {`${props.coaching.ADDRESS}`}
        </h6>
      </div>
    </div>
  );
};

const CoachingPanel = (props) => {
  const globalCtx = useContext(GlobalContext);
  const type = cookies.get("type");
  const [coursesList, setCoursesList] = useState([]);
  const [rating, setRating] = useState(0);
  const joinCoaching = async () => {
    const res = await coachingController.joinCoaching(
      props.coaching.COACHING_ID
    );
    if (res.success) {
      globalCtx.setPendingUpdate(true);
    }
  };
  const cancelJoin = async () => {
    const res = await coachingController.cancelJoinRequest(
      props.coaching.COACHING_ID
    );
    if (res.success) {
      globalCtx.setPendingUpdate(true);
    }
  };
  const setList = async () => {
    const res = await coachingController.getCourseList(
      props.coaching.COACHING_ID
    );
    if (res.success) {
      setCoursesList(res.data);
    }
  };
  useEffect(() => {
    setList();
  }, [props]);
  return (
    <Zoom in={true}>
      <div className="coaching-panel">
        {props.coaching === undefined ? (
          <></>
        ) : (
          <>
            <CoachingBanner coaching={props.coaching} />
            {type === "STUDENT" && props.coaching.TYPE !== "MEMBER" ? (
              props.coaching.TYPE === null ? (
                <Button
                  variant="contained"
                  className="blue-button horizontal-center full-width"
                  onClick={joinCoaching}
                >
                  Join
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className="red-button horizontal-center full-width"
                  onClick={cancelJoin}
                >
                  Cancel
                </Button>
              )
            ) : (
              <div className="flex-center vbox">
                <Divider />
                {/* <div className="rating-container poppins-font text-center">
                {`How would you rate ${props.coaching.NAME}?`}
              </div>
              <Rating
                className="rating"
                name="simple-controlled"
                value={rating}
                size="large"
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              /> */}
              </div>
            )}
            <Divider />
            {/* <h5>Available Courses</h5> */}
            <CoachingCoursesTable list={coursesList} />
            <div
              className="flex-center"
              style={{
                width: "100%",
                background: "linear-gradient(#1a4870, #16344e)",
                height: "7vh",
                color: "white",
                fontFamily: "sans-serif",
                fontSize: ".9rem",
                borderRadius: "0 0 5px 5px",
              }}
            >
              Available Courses
            </div>
          </>
        )}
      </div>
    </Zoom>
  );
};

export default CoachingPanel;
