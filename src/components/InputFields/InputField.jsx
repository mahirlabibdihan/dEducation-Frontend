import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
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
      <TextField
        required
        id="outlined-adornment"
        className="outlined-input"
        type={props.type}
        value={props.value}
        onChange={
          props.index === undefined
            ? props.onChange(props.id)
            : props.onChange(props.id, props.index)
        }
        label={props.label}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{props.endAdornment}</InputAdornment>
          ),
        }}
        size="small"
      />
    </FormControl>
  );
};

export const MultiLineField = (props) => {
  return (
    <FormControl fullWidth className="input-field" variant="outlined">
      <InputLabel htmlFor="outlined-adornment" className="input-label">
        {props.label}
      </InputLabel>
      <OutlinedInput
        required
        multiline={true}
        rows={props.rows}
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

export const NumberField = (props) => {
  return (
    <FormControl fullWidth className="input-field" variant="outlined">
      <InputLabel htmlFor="outlined-adornment" className="input-label">
        {props.label}
      </InputLabel>
      <OutlinedInput
        required
        placeholder="0"
        inputProps={{
          step: props.step,
          min: props.min,
          max: props.max,
        }}
        id="outlined-adornment"
        className="outlined-input"
        type="number"
        value={props.value}
        onChange={props.onChange(props.id)}
        label={props.label}
        endAdornment={props.endAdornment}
      />
    </FormControl>
  );
};
export default InputField;
