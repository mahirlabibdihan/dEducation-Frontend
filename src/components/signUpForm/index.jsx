import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import PasswordField from "../passwordField";
import "./signUpForm.scss";
const SignUpForm = (props) => {
  const [values, setValues] = useState({
    email: "",
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const emailField = () => {
    return (
      <FormControl fullWidth variant="outlined" className="mb-3">
        <InputLabel htmlFor="outlined-adornment-password">
          Email address
        </InputLabel>
        <OutlinedInput
          required
          id="outlined-adornment-email"
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          label="Email address"
        />
      </FormControl>
    );
  };
  const loginLink = () => {
    return (
      <MuiLink
        href="/login"
        variant="body2"
        underline="hover"
        className="login-link"
      >
        <Typography align="center" className="pt-2 text-secondary">
          Already have an account?
        </Typography>
      </MuiLink>
    );
  };
  const signUpButton = () => {
    return (
      <Button
        type="submit"
        variant="contained"
        color="success"
        className="rounded sign-up-button"
        sx={{
          bgcolor: "#36a420",
          "&:hover": {
            color: "white",
            bgcolor: "#25842d",
          },
        }}
      >
        Sign Up
      </Button>
    );
  };
  return (
    <Box
      component="form"
      className={`w-25 p-5 rounded shadow sign-up-form ${props.className}`}
    >
      {emailField()}
      <PasswordField />
      {signUpButton()}
      {loginLink()}
    </Box>
  );
};

export default SignUpForm;
