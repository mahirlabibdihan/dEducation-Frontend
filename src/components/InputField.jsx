import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
const InputField = (props) => {
  return (
    <FormControl fullWidth className="mb-3" variant="outlined">
      <InputLabel htmlFor="outlined-adornment">{props.label}</InputLabel>
      <OutlinedInput
        required
        id="outlined-adornment"
        type={props.type}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        label={props.label}
        endAdornment={props.endAdornment}
      />
    </FormControl>
  );
};

export default InputField;
