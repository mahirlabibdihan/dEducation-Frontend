import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const EyeIcon = (props) => {
  return (
    <>
      {props.isVisible > 0 ? (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={(e) => props.setShowPassword(!props.showPassword)}
            onMouseDown={(e) => e.preventDefault}
            edge="end"
          >
            {props.showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      ) : (
        <></>
      )}
    </>
  );
};

export default EyeIcon;
