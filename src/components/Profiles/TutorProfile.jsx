import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { PublicProfilePic } from "../Images/ProfilePic";
import "./TutorProfile.scss";

const TutorProfile = (props) => {
  const [type, setType] = useState("about");
  useEffect(() => {
    setType("about");
  }, [props]);
  const About = (props) => {
    return (
      <h6 className="about-details">
        {`${props.tutor.NAME} is a `}
        <b>{props.tutor.GENDER}</b>
        {` tutor who teaches `}
        <b>{props.tutor.EXPERTISE}</b>
        {`. Has `}
        <b>{`${props.tutor.YEARS_OF_EXPERIENCE} years`}</b>
        {` of experience. Currently `}
        <b>{props.tutor.AVAILABILITY}</b>
        {` for new tution offers. Prefers a salary of `}
        <b>{`${props.tutor.PREFFERED_SALARY} BDT `}</b>
        {`per month. For more information
    please contact at `}
        <b>{props.tutor.PHONE_NUMBER}</b>
        {`.`}
      </h6>
    );
  };
  const Education = (props) => {
    return (
      <h6 className="education-details">
        {props.education.map((e) => (
          <>
            {new Date().getFullYear() < Number(e.PASSING_YEAR)
              ? `Will pass`
              : `Passed`}
            {` ${e.DEGREE}(${e.FIELD_OF_STUDY}) from ${e.INSTITUTE} in ${e.PASSING_YEAR}.`}
            <br></br>
          </>
        ))}
      </h6>
    );
  };
  return (
    <div className="tutor-profile">
      <div className="profile-picture">
        <PublicProfilePic
          image={props.tutor.IMAGE}
          rating={props.tutor.RATING}
        />
      </div>

      <div className="banner-details">
        <h3 className="text-center">{props.tutor.NAME}</h3>
        <Divider />
        {props.tutor.GENDER === null ||
        props.tutor.EXPERTISE === null ||
        props.tutor.YEARS_OF_EXPERIENCE === null ||
        props.tutor.AVAILABILITY === null ||
        props.tutor.PREFFERED_SALARY === null ||
        props.tutor.PHONE_NUMBER === null ? (
          <h6 className="about-details text-center">
            Profile is not completed yet
          </h6>
        ) : (
          <div className="full-details vbox">
            {type === "about" ? (
              <About tutor={props.tutor} />
            ) : (
              <Education education={props.education} />
            )}
            <div className="hbox">
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  background:
                    "linear-gradient(rgba(26, 72, 112, 0.9),rgba(22, 52, 78, 1))",
                }}
                onClick={() => setType("about")}
              >
                About
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  background:
                    "linear-gradient(rgba(26, 72, 112, 0.9),rgba(22, 52, 78, 1))",
                }}
                onClick={() => setType("education")}
              >
                Education
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorProfile;
