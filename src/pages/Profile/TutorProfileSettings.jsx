import React, { useState, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import ProfileController from "../../controller/profileController";
const profileController = new ProfileController();
const TutorProfileSettings = () => {
  const [user, setUser] = useState({
    name: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    type: "",
    subjects: "",
    salary: "",
    experience: "",
    status: "",
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
      subjects: data.SUBJECTS,
      salary: data.PREFFERED_SALARY,
      experience: data.YEARS_OF_EXPERIENCE,
      status: data.STATUS,
    });
  };
  useEffect(() => {
    setProfileData();
    // console.log("EFFECT");
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
      label: "Phone Number",
      id: "phone",
      value: user.phone,
    },
    {
      label: "Teaching Subjects",
      id: "subjects",
      value: user.subjects,
    },
    {
      label: "Preffered Salary",
      id: "salary",
      value: user.salary,
    },
    {
      label: "Years of Experience",
      id: "experience",
      value: user.experience,
    },
    {
      label: "Status",
      id: "status",
      value: user.status,
    },
  ];
  return (
    <div className="profile-details">
      <h2 className="header">Profile Settings</h2>
      <Divider />
      <div className="input-fields">
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

export default TutorProfileSettings;
