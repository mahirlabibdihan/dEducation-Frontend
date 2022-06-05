import React, { useState, useContext } from "react";
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
import AuthContext from "../../store/auth-context";
import Cookies from "universal-cookie";
import { api_base_url } from "../../index";
const cookies = new Cookies();
const COOKIE_AGE = 31536000;

// import styles from "./_LoginForm.module.scss";
// import { StyledEngineProvider } from "@mui/material/styles";
// const server =
const LoginForm = (props) => {
  const [values, setValues] = useState({
    email: "",
    pass: "",
    showPassword: false,
  });
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(api_base_url + "/auth/login", values)
      .then((res) => {
        cookies.set("token", res.data.token, { path: "/", maxAge: COOKIE_AGE });
        console.log(res.data.token);
        navigate(`/profile`);
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
      <Typography
        component={Link}
        to="/"
        align="center"
        className="pt-2 pb-3 border-bottom text-secondary"
      >
        Forgot Password?
      </Typography>
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
