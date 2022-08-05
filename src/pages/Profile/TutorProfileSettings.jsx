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
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { showToast } from "../../App";
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
  const [newEducation, setNewEducation] = useState({
    eq_id: null,
    institute: "",
    field_of_study: "",
    degree: "",
    passing_year: "",
  });

  const [educationsList, setEducationsList] = useState([]);
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
    const result = await profileController.getEducation();
    console.log("EDU", result);
    const list = [];
    const fields = [];
    for (let i = 0; i < result.data.length; i++) {
      list.push({
        eq_id: result.data[i].EQ_ID,
        institute: result.data[i].INSTITUTE,
        field_of_study: result.data[i].FIELD_OF_STUDY,
        degree: result.data[i].DEGREE,
        passing_year: result.data[i].PASSING_YEAR,
      });
      fields.push(getEducationField(list[list.length - 1]));
    }
    setEducationsList(list);
    setEducationFields(fields);
  };
  useEffect(() => {
    setProfileData();
    // console.log("EFFECT");
  }, []);
  const [educationFields, setEducationFields] = useState([]);
  const handleChange = (prop) => (event) => {
    console.log("WHY!!!!!");
    setUser({ ...user, [prop]: event.target.value });
  };

  const handleAdd = (e) => {
    educationsList.push(newEducation);
    setEducationsList(educationsList);
    setNewEducation({
      eq_id: null,
      institute: "",
      field_of_study: "",
      degree: "",
      passing_year: "",
    });
    educationFields.push(getEducationField(newEducation));
    setEducationFields(educationFields);
    console.log(educationsList, educationFields);
  };
  const handleDelete = (index) => (e) => {
    const list1 = [];
    for (let i = 0; i < educationsList.length; i++) {
      if (i !== index) {
        list1.push(educationsList[i]);
      }
    }
    setEducationsList(list1);
    const list2 = [];
    for (let i = 0; i < educationFields.length; i++) {
      if (i !== index) {
        list2.push(educationFields[i]);
      }
    }
    setEducationFields(list2);
    console.log(educationsList, educationFields);
  };
  const handleNewEducationChange = (prop) => (event) => {
    console.log(prop, "->", event.target.value, "::", newEducation);
    setNewEducation({ ...newEducation, [prop]: event.target.value });
  };
  const handleOldEducationChange = (prop, index) => (event) => {
    console.log(prop, "->", event.target.value, "::", index);
    console.log("BEFORE", educationsList);
    educationsList[index][prop] = event.target.value;
    // setEducationsList(educationsList);
    // setEducationsList({ ...educationsList[index], [prop]: event.target.value });
    setEducationsList((current) =>
      current.map((obj, id) => {
        if (id === index) {
          console.log("FOUND");
          return { ...obj, [prop]: event.target.value };
        }
        return obj;
      })
    );
    console.log("AFTER", educationsList[index]);
    educationFields[index] = getEducationField(educationsList[index]);
    setEducationFields(educationFields);
    // setNewEducation({ ...newEducation, [prop]: event.target.value });
  };
  // useEffect(() => {
  //   const fields = [];
  //   for (let i = 0; i < educationsList.length; i++) {
  //     fields.push(getEducationField(educationsList[i]));
  //   }
  //   setEducationFields(fields);
  // }, educationsList);
  const handleSave = async (event) => {
    const result1 = await profileController.setProfile({
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
    console.log("EDUCATION BEFORE SAVE", educationsList);
    const result2 = await profileController.setEducation(educationsList);
    // await setProfileData();
    if (result1.success && result2.success) {
      showToast("Profile updated");
    } else {
      showToast("Server error occured", "error");
    }
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
    // {
    //   label: "Phone Number",
    //   id: "phone",
    //   value: user.phone,
    // },
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
  const getEducationField = (education) => {
    console.log("---->", education);
    return [
      {
        label: "Institute",
        id: "institute",
        value: education.institute,
      },
      {
        label: "Field of Study",
        id: "field_of_study",
        value: education.field_of_study,
      },
      {
        label: "Degree",
        id: "degree",
        value: education.degree,
      },
      {
        label: "Passing Year",
        id: "passing_year",
        value: education.passing_year,
      },
    ];
  };
  const newEducationFields = getEducationField(newEducation);
  return (
    <div className="profile-details">
      <h2 className="header">Profile</h2>
      <Divider />
      <div className="input-fields">
        <InputField2
          label="Full Name"
          type="text"
          value={user.name}
          id="name"
          onChange={handleChange}
        />
        <div className="hbox">
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
          <InputField2
            label="Phone Number"
            type="text"
            value={user.phone}
            id="phone"
            onChange={handleChange}
          />
        </div>

        {inputFields.map((field, index) => (
          <InputField2
            label={field.label}
            type="text"
            value={field.value}
            id={field.id}
            onChange={handleChange}
          />
        ))}

        <div className="hbox">
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
      </div>
      <h4>Educational Qualification</h4>
      <div className="education-list">
        {educationFields.map((row, index) => (
          <div className="hbox">
            {row.map((col) => (
              <InputField2
                label={col.label}
                type="text"
                value={col.value}
                id={col.id}
                index={index}
                onChange={handleOldEducationChange}
              />
            ))}
            <Button
              variant="contained"
              className="delete-button"
              onClick={handleDelete(index)}
            >
              <DeleteOutlineIcon />
            </Button>
          </div>
        ))}
      </div>

      <div className="hbox new-education">
        {newEducationFields.map((field) => (
          <InputField2
            label={field.label}
            type="text"
            value={field.value}
            id={field.id}
            onChange={handleNewEducationChange}
          />
        ))}
        <Button variant="contained" className="add-button" onClick={handleAdd}>
          <AddIcon />
        </Button>
      </div>

      <Button variant="contained" className="save-button" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default TutorProfileSettings;
