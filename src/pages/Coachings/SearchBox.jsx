import React, { useState } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
const SearchBox = () => {
  const [values, setValues] = useState({
    type: "",
    desired_tutor_gender: "",
    subjects: "",
    days_per_week: "",
    salary: "",
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <div className="search-box">
      <h1 className="header">Filter</h1>
      <Divider />
      <div className="input-fields">
        {[
          {
            label: "Subjects",
            id: "subjects",
            value: values.subjects,
          },
          {
            label: "Class",
            id: "desired_tutor_gender",
            value: values.desired_tutor_gender,
          },
          {
            label: "Location",
            id: "days_per_week",
            value: values.days_per_week,
          },  
        ].map((field, index) => (
          <InputField2
            label={field.label}
            type="text"
            value={field.value}
            id={field.id}
            onChange={handleChange}
          />
        ))}
      </div>
      <Button variant="contained" className="apply-button">
        Apply
      </Button>
    </div>
  );
};

export default SearchBox;
