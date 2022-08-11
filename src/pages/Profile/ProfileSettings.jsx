import React from "react";
import TutorProfileSettings from "../../components/Forms/TutorProfileSettings";
import StudentProfileSettings from "../../components/Forms/StudentProfileSettings";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const ProfileSettings = (props) => {
  const type = cookies.get("type");
  return (
    <>
      {type === "STUDENT" ? (
        <StudentProfileSettings />
      ) : (
        <TutorProfileSettings />
      )}
    </>
  );
};

export default ProfileSettings;
