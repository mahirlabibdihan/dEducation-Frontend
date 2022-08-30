import React from "react";
import Divider from "@mui/material/Divider";
import { PublicProfilePic } from "../Images/ProfilePic";
import "./StudentProfile.scss";

const StudentProfile = (props) => {
  const student = props.student;
  return (
    <div className="student-profile">
      <div className="profile-picture">
        <PublicProfilePic image={student.IMAGE} />
      </div>
      <h3 className="text-center">{student.NAME}</h3>
      <Divider />
      <div className="banner-details">
        {student.GENDER === null ||
        student.CLASS === null ||
        student.VERSION === null ||
        student.INSTITUTION === null ||
        student.ADDRESS === null ||
        student.PHONE_NUMBER === null ? (
          <h6 className="about-details text-center">
            Profile is not completed yet
          </h6>
        ) : (
          <div className="full-details">
            <h6 className="about-details">
              {`${student.NAME} is a `}
              <b>{student.GENDER}</b>
              {` student of `}
              <b>{`${student.CLASS}`}</b>
              {`(${student.VERSION}). Studies at `}
              <b>{student.INSTITUTION}</b>
              {` and lives at `}
              <b>{student.ADDRESS}</b>
              {`.`}
              <br></br>
              {`Phone number: `}
              <b>{student.PHONE_NUMBER}</b>
            </h6>
          </div>
        )}
      </div>
    </div>
  );
};
export default StudentProfile;
