import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
const InputField = (props) => {
  return (
    <FormControl fullWidth className="input-field" variant="outlined">
      <InputLabel htmlFor="outlined-adornment" className="input-label">
        {props.label}
      </InputLabel>
      <OutlinedInput
        required
        id="outlined-adornment"
        className="outlined-input"
        type={props.type}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        label={props.label}
        endAdornment={props.endAdornment}
      />
    </FormControl>
  );
};

export const InputField2 = (props) => {
  return (
    <FormControl fullWidth className="input-field" variant="outlined">
      <InputLabel htmlFor="outlined-adornment" className="input-label">
        {props.label}
      </InputLabel>
      <OutlinedInput
        required
        id="outlined-adornment"
        className="outlined-input"
        type={props.type}
        value={props.value}
        onChange={props.onChange(props.id)}
        label={props.label}
        endAdornment={props.endAdornment}
      />
    </FormControl>
  );
};

export default InputField;
