import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import { Link } from "react-router-dom";
import "./loginForm.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import styles from "./_LoginForm.module.scss";
// import { StyledEngineProvider } from "@mui/material/styles";
const LoginForm = (props) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", values)
      .then((res) => {
        console.log(res.data);
        if (res.data.USERNAME === undefined) {
          navigate("/login");
        } else {
          console.log(res.data.USERNAME);
          navigate(`/profile/${res.data.USERNAME}`);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      })
      .finally(() => {});
  };
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
          value={values.password}
          label="Password"
          onChange={handleChange("password")}
          endAdornment={
            values.password.length > 0 ? (
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
      <Button
        type="submit"
        variant="contained"
        className="login-button"
        onClick={handleLogin}
      >
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
      {passwordField()}
      {loginButton()}
      {resetPassword()}
      {signUpButton()}
    </Box>
  );
};

export default LoginForm;
