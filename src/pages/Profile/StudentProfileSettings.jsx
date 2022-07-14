import React, { useState, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import ProfileController from "../../controller/profileController";
import SelectionField from "../../components/SelectionField";
const profileController = new ProfileController();
const StudentProfileSettings = () => {
  const [user, setUser] = useState({
    name: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    type: "",
    class: "",
    version: "",
    institution: "",
    address: "",
  });
  const setProfileData = async () => {
    const data = await profileController.getProfile();
    console.log("CHILD: ", data.EMAIL);
    setUser({
      name: data.NAME,
      gender: data.GENDER,
      dob: data.DATE_OF_BIRTH,
      phone: data.PHONE_NUMBER,
      email: data.EMAIL,
      type: data.TYPE,
      class: data.CLASS,
      version: data.VERSION,
      institution: data.INSTITUTION,
      address: data.ADDRESS,
    });
  };
  useEffect(() => {
    setProfileData();
  }, []);
  const handleChange = (prop) => (event) => {
    setUser({ ...user, [prop]: event.target.value });
  };
  const handleSave = async (event) => {
    await profileController.setProfile(user);
    console.log("UPDATED", user);
    await setProfileData();
  };

  const inputFields = [
    {
      label: "Full Name",
      id: "name",
      value: user.name,
    },
    {
      label: "Gender",
      id: "gender",
      value: user.gender,
    },
    {
      label: "Class",
      id: "class",
      value: user.class,
    },
    {
      label: "Version",
      id: "version",
      value: user.version,
    },
    {
      label: "Institution",
      id: "institution",
      value: user.institution,
    },
    {
      label: "Phone Number",
      id: "phone",
      value: user.phone,
    },
    {
      label: "Address",
      id: "address",
      value: user.address,
    },
  ];
  return (
    <div className="profile-details">
      <h2 className="header">Profile Settings</h2>
      <Divider />
      <div className="input-fields">
        {/* <SelectionField
          label="Gender"
          value={user.gender}
          id="gender"
          onChange={handleChange}
          list={["Male", "Female"]}
        ></SelectionField>
        <SelectionField
          label="Version"
          value={user.version}
          id="version"
          onChange={handleChange}
          list={["Bangla", "English"]}
        ></SelectionField> */}
        {inputFields.map((field, index) => (
          <InputField2
            label={field.label}
            type="text"
            value={field.value}
            id={field.id}
            onChange={handleChange}
          />
        ))}
      </div>
      <Button variant="contained" className="save-button" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default StudentProfileSettings;
