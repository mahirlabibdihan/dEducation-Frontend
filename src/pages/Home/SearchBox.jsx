import React, { useState, useEffect, useContext } from "react";
import { Divider } from "@mui/material";
import { NumberField } from "../../components/InputField";
import SelectionField from "../../components/SelectionField";
import { Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import GlobalContext from "../../store/GlobalContext";
const SearchBox = () => {
  const globalCtx = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const initValues = {
    start_salary: 0,
    end_salary: 100000,
    days_per_week: 7,
    version: "Any",
    gender: "Any",
    tution_type: "Any",
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
        gender: searchParams.get("gender"),
        start_salary: searchParams.get("start"),
        end_salary: searchParams.get("end"),
        days_per_week: searchParams.get("days"),
        version: searchParams.get("version"),
        tution_type: searchParams.get("type"),
      });
    }
  }, []);
  const handleSearch = (event) => {
    const tmp = new URLSearchParams();
    tmp.set("gender", values.gender);
    tmp.set("start", values.start_salary);
    tmp.set("end", values.end_salary);
    tmp.set("days", values.days_per_week);
    tmp.set("version", values.version);
    tmp.set("type", values.tution_type);
    setSearchParams(tmp);
    globalCtx.setPendingUpdate(true);
  };
  const handleClear = (event) => {
    const tmp = new URLSearchParams();
    setSearchParams(tmp);
    setValues(initValues);
    globalCtx.setPendingUpdate(true);
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className="search-box">
      <h1 className="header">Filter</h1>
      <Divider />
      <div className="input-fields">
        <SelectionField
          label="Tuition Type"
          value={values.tution_type}
          id="tution_type"
          onChange={handleChange}
          list={["Any", "Offline", "Online"]}
        ></SelectionField>
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
        <NumberField
          label="Maximum Days / Week"
          min={1}
          max={7}
          step={1}
          value={values.days_per_week}
          id="days_per_week"
          onChange={handleChange}
        />
        <SelectionField
          label="Medium"
          value={values.version}
          id="version"
          onChange={handleChange}
          list={["Any", "Bangla Medium", "English Medium", "English Version"]}
        />
        <SelectionField
          label="Student's Gender"
          value={values.gender}
          id="gender"
          onChange={handleChange}
          list={["Any", "Male", "Female"]}
        />
      </div>
      <Button
        variant="contained"
        className="apply-button"
        onClick={handleSearch}
      >
        Search
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
