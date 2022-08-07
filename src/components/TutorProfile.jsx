import React, { useState } from "react";
import { Button, Divider } from "@mui/material";
import { PublicProfilePic } from "./ProfilePic";
import "./TutorProfile.scss";

const TutorProfile = (props) => {
  const tutor = props.tutor;
  const [type, setType] = useState("about");
  const profileDetails = [
    [
      { label: "Gender", value: tutor.GENDER },
      { label: "Preffered Salary", value: tutor.PREFFERED_SALARY },
    ],

    [
      { label: "Status", value: tutor.AVAILABILITY },
      { label: "Experience", value: tutor.YEARS_OF_EXPERIENCE },
    ],
  ];
  const About = (props) => {
    const tutor = props.tutor;
    return (
      <h6 className="about-details">
        {`${tutor.NAME} is a `}
        <b>{tutor.GENDER}</b>
        {` tutor who teaches `}
        <b>{tutor.EXPERTISE}</b>
        {`. Has `}
        <b>{`${tutor.YEARS_OF_EXPERIENCE} years`}</b>
        {` of experience. Currently `}
        <b>{tutor.AVAILABILITY}</b>
        {` for new tution offers. Prefers a salary of `}
        <b>{`${tutor.PREFFERED_SALARY} BDT `}</b>
        {`per month. For more information
    please contact at `}
        <b>{tutor.PHONE_NUMBER}</b>
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
        <PublicProfilePic image={tutor.IMAGE} rating={tutor.RATING} />
      </div>

      <div className="banner-details">
        <h3 className="text-center">{tutor.NAME}</h3>
        <Divider />
        <div className="full-details vbox">
          {type === "about" ? (
            <About tutor={tutor} />
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
