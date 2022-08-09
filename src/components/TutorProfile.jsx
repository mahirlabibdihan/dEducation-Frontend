import React, { useState, useEffect } from "react";
import { Button, Divider } from "@mui/material";
import { PublicProfilePic } from "./ProfilePic";
import "./TutorProfile.scss";

const TutorProfile = (props) => {
  const [type, setType] = useState("about");
  const profileDetails = [
    [
      { label: "Gender", value: props.tutor.GENDER },
      { label: "Preffered Salary", value: props.tutor.PREFFERED_SALARY },
    ],

    [
      { label: "Status", value: props.tutor.AVAILABILITY },
      { label: "Experience", value: props.tutor.YEARS_OF_EXPERIENCE },
    ],
  ];
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
          <h6>
            {new Date().getFullYear() < Number(e.PASSING_YEAR)
              ? `Will pass`
              : `Passed`}
            {` ${e.DEGREE}(${e.FIELD_OF_STUDY}) from ${e.INSTITUTE} in ${e.PASSING_YEAR}.`}
          </h6>
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
        <div className="full-details vbox">
          {type === "about" ? (
            <About tutor={props.tutor} />
          ) : (
            <Education education={props.education} />
          )}

          {/* <div className="hbox">
            {profileDetails.map((row) => {
              return (
                <div className="vbox">
                  {row.map((col) => (
                    <h6>{`${col.label}: ${col.value}`}</h6>
                  ))}
                </div>
              );
            })}
          </div>
          <h6>{`Phone Number: ${tutor.PHONE_NUMBER}`}</h6>
          <h6>{`Subjects: ${tutor.EXPERTISE}`}</h6>
          */}
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
      </div>
    </div>
  );
};

export default TutorProfile;
