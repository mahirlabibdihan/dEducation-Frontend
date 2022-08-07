import React, { useState, useContext } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, {
  InputField2,
  NumberField,
} from "../../components/InputField";
import SelectionField from "../../components/SelectionField";
import { Button } from "@mui/material";
import { Slider } from "@mui/material";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import GlobalContext from "../../store/GlobalContext";
const SearchBox = () => {
  const globalCtx = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const initValues = {
    desired_tutor_gender: "Any",
    start_salary: 0,
    end_salary: 100000,
    status: "Any",
    experience: 0,
  };
  const [values, setValues] = useState(initValues);
  useEffect(() => {
    setValues({
      ...values,
      end_salary: Math.max(values.start_salary, values.end_salary),
    });
  }, [values.start_salary]);
  useEffect(() => {
    if (searchParams.get("gender") !== null) {
      setValues({
        desired_tutor_gender: searchParams.get("gender"),
        start_salary: searchParams.get("start"),
        end_salary: searchParams.get("end"),
        status: searchParams.get("status"),
        experience: searchParams.get("experience"),
      });
    }
  }, []);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSearch = (event) => {
    const tmp = new URLSearchParams();
    tmp.set("gender", values.desired_tutor_gender);
    tmp.set("start", values.start_salary);
    tmp.set("end", values.end_salary);
    tmp.set("status", values.status);
    tmp.set("experience", values.experience);
    setSearchParams(tmp);
    globalCtx.setPendingUpdate(true);
  };
  const handleClear = (event) => {
    const tmp = new URLSearchParams();
    setSearchParams(tmp);
    setValues(initValues);
    globalCtx.setPendingUpdate(true);
  };
  return (
    <div className="search-box">
      <h1 className="header">Filter</h1>
      <Divider />
      <div className="input-fields">
        <SelectionField
          label="Desired Tutor Gender"
          value={values.desired_tutor_gender}
          id="desired_tutor_gender"
          onChange={handleChange}
          list={["Any", "Male", "Female"]}
        />
        {/* <Slider
          getAriaLabel={() => "Temperature range"}
          value={values}
          onChange={handleChange}
          valueLabelDisplay="auto"
          // getAriaValueText={valuetext}
        /> */}
        <NumberField
          label="Lowest Salary (BDT)"
          type="number"
          min={0}
          max={100000}
          step={1000}
          value={values.start_salary}
          id="start_salary"
          onChange={handleChange}
        />
        <NumberField
          label="Highest Salary (BDT)"
          type="number"
          min={values.start_salary}
          max={100000}
          step={1000}
          value={values.end_salary}
          id="end_salary"
          onChange={handleChange}
        />
        <SelectionField
          label="Availability"
          value={values.status}
          id="status"
          onChange={handleChange}
          list={["Any", "Available", "Unavailable"]}
        />
        <NumberField
          label="Minimum Experience (Years)"
          type="number"
          min={0}
          max={100}
          step={1}
          value={values.experience}
          id="experience"
          onChange={handleChange}
        />
      </div>
      <Button
        variant="contained"
        className="apply-button"
        onClick={handleSearch}
      >
        Apply
      </Button>
      <Button
        variant="contained"
        className="clear-button"
        onClick={handleClear}
      >
        Reset
      </Button>
    </div>
  );
};

export default SearchBox;
