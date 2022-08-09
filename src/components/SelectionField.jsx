import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Select, MenuItem } from "@mui/material";
import "./components.scss";
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: "30vh",
    },
  },
};
export const MultiSelectionField = (props) => {
  return (
    <FormControl fullWidth className=" input-field" variant="outlined">
      <InputLabel htmlFor="outlined-adornment" className="input-label">
        {props.label}
      </InputLabel>
      <Select
        required
        multiple
        id="outlined-adornment"
        className="outlined-input"
        value={props.value}
        onChange={props.onChange(props.id)}
        input={<OutlinedInput label={props.label} />}
        MenuProps={MenuProps}
      >
        {props.list.map((value) => (
          <MenuItem
            key={value}
            value={value}
            // sx={{ height: "2rem" }}
            // style={getStyles(name, personName, theme)}
          >
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
const SelectionField = (props) => {
  return (
    <FormControl fullWidth className=" input-field" variant="outlined">
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
        MenuProps={MenuProps}
        // MenuProps={MenuProps}
      >
        {props.list.map((value) => (
          <MenuItem
            key={value}
            value={value}
            // sx={{ height: "2rem" }}
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
