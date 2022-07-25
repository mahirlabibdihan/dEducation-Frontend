import React, { useState, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, {
  InputField2,
  NumberField,
} from "../../components/InputField";
import SelectionField from "../../components/SelectionField";
import { Button } from "@mui/material";
import ProfileController from "../../controller/profileController";
import { format } from "date-fns";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
const profileController = new ProfileController();
const TutorProfileSettings = () => {
  const [user, setUser] = useState({
    name: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
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
      dob: new Date(data.DATE_OF_BIRTH),
      phone: data.PHONE_NUMBER,
      email: data.EMAIL,
      subjects: data.EXPERTISE,
      salary: data.PREFFERED_SALARY,
      experience: data.YEARS_OF_EXPERIENCE,
      status: data.AVAILABILITY,
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
    await profileController.setProfile({
      name: user.name,
      gender: user.gender,
      dob: format(user.dob, "MM/dd/yyyy"),
      phone: user.phone,
      email: user.email,
      subjects: user.subjects,
      salary: user.salary,
      experience: user.experience,
      status: user.status,
    });
    console.log("UPDATED", user);
    await setProfileData();
  };
  const inputFields = [
    // {
    //   label: "Full Name",
    //   id: "name",
    //   value: user.name,
    // },
    // {
    //   label: "Gender",
    //   id: "gender",
    //   value: user.gender,
    // },
    // {
    //   label: "Date of Birth",
    //   id: "dob",
    //   value: user.dob,
    // },
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
    // {
    //   label: "Preffered Salary",
    //   id: "salary",
    //   value: user.salary,
    // },
    // {
    //   label: "Years of Experience",
    //   id: "experience",
    //   value: user.experience,
    // },
    // {
    //   label: "Status",
    //   id: "status",
    //   value: user.status,
    // },
  ];
  return (
    <div className="profile-details">
      <h2 className="header">Profile Settings</h2>
      <Divider />
      <div className="input-fields">
        <InputField2
          label="Full Name"
          type="text"
          value={user.name}
          id="name"
          onChange={handleChange}
        />
        <SelectionField
          label="Gender"
          value={user.gender}
          id="gender"
          onChange={handleChange}
          list={["Male", "Female"]}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="Date of Birth"
            inputFormat="MM/dd/yyyy"
            value={user.dob}
            onChange={(date) => {
              console.log(date);
              setUser({ ...user, dob: date });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: "100%",
                }}
              />
            )}
            className="date-picker"
          />
        </LocalizationProvider>
        {inputFields.map((field, index) => (
          <InputField2
            label={field.label}
            type="text"
            value={field.value}
            id={field.id}
            onChange={handleChange}
          />
        ))}
        <NumberField
          label="Preffered Salary (BDT)"
          type="number"
          min={0}
          max={100000}
          step={1000}
          value={user.salary}
          id="salary"
          onChange={handleChange}
        />
        <NumberField
          label="Years of Experience"
          type="number"
          min={0}
          max={100}
          step={1}
          value={user.experience}
          id="experience"
          onChange={handleChange}
        />
        <SelectionField
          label="Status"
          value={user.status}
          id="status"
          onChange={handleChange}
          list={["Available", "Unavailable"]}
        />
      </div>
      <Button variant="contained" className="save-button" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default TutorProfileSettings;
