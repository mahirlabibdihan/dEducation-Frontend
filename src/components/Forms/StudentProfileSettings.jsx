import React, { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import ProfileController from "../../controller/profileController";
import { format } from "date-fns";
import { StudentProfileSettingsFields } from "../InputFields";
import { Zoom } from "@mui/material";
const profileController = new ProfileController();
const StudentProfileSettings = () => {
  const [user, setUser] = useState({
    name: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    class: "",
    version: "",
    institution: "",
    address: "",
  });
  const setProfileData = async () => {
    const res = await profileController.getProfile();
    const data = res.data;
    console.log("CHILD: ", data.DATE_OF_BIRTH);
    setUser({
      name: data.NAME,
      gender: data.GENDER,
      // dob: format(, "MM/dd/yyyy"),
      dob: data.DATE_OF_BIRTH == null ? null : new Date(data.DATE_OF_BIRTH),
      phone: data.PHONE_NUMBER,
      email: data.EMAIL,
      class: data.CLASS,
      version: data.VERSION,
      institution: data.INSTITUTION,
      address: data.ADDRESS,
    });
  };
  useEffect(() => {
    // setLoading(true);
    setProfileData();
  }, []);
  const handleChange = (prop) => (event) => {
    setUser({ ...user, [prop]: event.target.value });
  };
  const handleSave = async (event) => {
    const res = await profileController.setProfile({
      name: user.name,
      gender: user.gender,
      dob: format(user.dob, "MM/dd/yyyy"),
      phone: user.phone,
      email: user.email,
      class: user.class,
      version: user.version,
      institution: user.institution,
      address: user.address,
    });
    if (res.success) {
      await setProfileData();
    }
  };

  return (
    <div className="profile-details">
      <h2 className="header">Profile</h2>
      <Divider />
      <Zoom in={true}>
        <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
          <StudentProfileSettingsFields
            user={user}
            setUser={setUser}
            handleChange={handleChange}
          />
          <Button
            variant="contained"
            className="blue-button standard-button-width horizontal-center"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </Zoom>
    </div>
  );
};

export default StudentProfileSettings;
