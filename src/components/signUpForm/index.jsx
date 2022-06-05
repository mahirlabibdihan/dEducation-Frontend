import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MuiLink from "@mui/material/Link";
import { api_base_url } from "../../index";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signUpForm.scss";
const SignUpForm = (props) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const passwordField = () => {
    return (
      <FormControl fullWidth variant="outlined" className="mb-3">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          required
          id="outlined-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.pass}
          label="Password"
          onChange={handleChange("pass")}
          endAdornment={
            values.pass.length > 0 ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ) : (
              <></>
            )
          }
        />
      </FormControl>
    );
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
  const nameField = () => {
    return (
      <FormControl fullWidth variant="outlined" className="mb-3">
        <InputLabel htmlFor="outlined-adornment-password">Name</InputLabel>
        <OutlinedInput
          required
          id="outlined-adornment-email"
          type="text"
          value={values.name}
          onChange={handleChange("name")}
          label="Name"
        />
      </FormControl>
    );
  };
  const loginLink = () => {
    return (
      <Typography
        component={Link}
        to="/login"
        align="center"
        className="pt-2 text-secondary"
      >
        Already have an account?
      </Typography>
    );
  };
  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post(api_base_url + "/auth/signup", values)
      .then((res) => {
        console.log("Successfully registered");
        navigate("/login");
      })
      .catch((err) => {
        switch (err.response.status) {
          case 404:
            break;
          case 401:
            break;
          case 500:
            break;
          default:
        }
        navigate("/signup");
      })
      .finally(() => {});
  };
  const signUpButton = () => {
    return (
      <Button
        type="submit"
        variant="contained"
        color="success"
        className="rounded sign-up-button"
        onClick={handleSignup}
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
      {nameField()}
      {emailField()}
      {passwordField()}
      {signUpButton()}
      {loginLink()}
    </Box>
  );
};

export default SignUpForm;
