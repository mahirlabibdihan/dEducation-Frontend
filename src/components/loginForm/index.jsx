import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import PasswordField from "../passwordField";
import { Link } from "react-router-dom";
import "./loginForm.scss";
// import styles from "./_LoginForm.module.scss";
// import { StyledEngineProvider } from "@mui/material/styles";
const LoginForm = (props) => {
  const [values, setValues] = useState({
    email: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const emailField = () => {
    return (
      <FormControl fullWidth className="mb-3" variant="outlined">
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
  const loginButton = () => {
    return (
      <Button type="submit" variant="contained" className="login-button">
        Login
      </Button>
    );
  };
  const resetPassword = () => {
    return (
      <MuiLink
        href="/"
        variant="body2"
        underline="hover"
        className="reset-password"
      >
        <Typography
          align="center"
          className="pt-2 pb-3 border-bottom text-secondary"
        >
          Forgot Password?
        </Typography>
      </MuiLink>
    );
  };
  const signUpButton = () => {
    return (
      <Button
        component={Link}
        to="/signup"
        variant="contained"
        color="success"
        className="rounded mt-3 sign-up-button"
      >
        Create New Account
      </Button>
    );
  };
  return (
    <Box
      component="form"
      className={`w-25 p-5 rounded shadow login-form ${props.className}`}
    >
      {emailField()}
      <PasswordField />
      {loginButton()}
      {resetPassword()}
      {signUpButton()}
    </Box>
  );
};

export default LoginForm;
