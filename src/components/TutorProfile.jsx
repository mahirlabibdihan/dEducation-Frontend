import React from "react";
import { Divider } from "@mui/material";
import { PublicProfilePic } from "./ProfilePic";
import "./TutorProfile.scss";

const TutorProfile = (props) => {
  const tutor = props.tutor;
  const profileDetails = [
    [
      { label: "Gender", value: tutor.GENDER },
      { label: "Salary", value: tutor.PREFFERED_SALARY },
    ],

    [
      { label: "Status", value: tutor.AVAILABILITY },
      { label: "Experience", value: tutor.YEARS_OF_EXPERIENCE },
    ],
  ];
  return (
    <div className="tutor-profile">
      <div className="profile-picture">
        <PublicProfilePic image={tutor.IMAGE} />
      </div>

      <div className="banner-details">
        <h3 className="">{tutor.NAME}</h3>
        <Divider />
        <div className="full-details vbox">
          <div className="hbox">
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
          <h6>{`Subjects: ${tutor.SUBJECTS}`}</h6>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
