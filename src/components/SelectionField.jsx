import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Select, MenuItem } from "@mui/material";
import "./components.scss";
const SelectionField = (props) => {
  return (
    <FormControl fullWidth className="mb-3 input-field" variant="outlined">
      <InputLabel htmlFor="outlined-adornment" className="input-label">
        {props.label}
      </InputLabel>
      <Select
        required
        id="outlined-adornment"
        className="outlined-input"
        value={props.value}
        onChange={props.onChange(props.id)}
        input={<OutlinedInput label={props.label} />}
        // MenuProps={MenuProps}
      >
        {props.list.map((value) => (
          <MenuItem
            key={value}
            value={value}
            // style={getStyles(name, personName, theme)}
          >
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectionField;
