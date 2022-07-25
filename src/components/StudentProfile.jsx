import React from "react";
import { Divider } from "@mui/material";
import { PublicProfilePic } from "./ProfilePic";
import "./StudentProfile.scss";

const StudentProfile = (props) => {
  const student = props.student;
  const profileDetails = [
    [
      { label: "Class", value: student.CLASS },
      { label: "Gender", value: student.GENDER },
    ],
    [{ label: "Version", value: student.VERSION }],
  ];
  return (
    <div className="student-profile">
      <div className="profile-picture">
        <PublicProfilePic image={student.IMAGE} />
      </div>

      <div className="banner-details">
        <h3 className="">{student.NAME}</h3>
        <Divider />
        <div className="full-details">
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
          <h6>{`Institution: ${student.INSTITUTION}`}</h6>
          <h6>{`Phone Number: ${student.PHONE_NUMBER}`}</h6>
          <h6>{`Address: ${student.ADDRESS}`}</h6>
        </div>
      </div>
    </div>
  );
};
export default StudentProfile;
