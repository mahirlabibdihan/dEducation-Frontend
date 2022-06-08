import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "./components.scss";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import EyeIcon from "./EyeIcon";
import { login } from "../api/auth";

// import styles from "./_LoginForm.module.scss";
// import { StyledEngineProvider } from "@mui/material/styles";
// const server =
const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login({
      email: email,
      pass: pass,
    });
    console.log(result);
    if (result.success) {
      navigate("/profile");
    }
  };
  const LoginButton = () => {
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
  const ResetPassword = () => {
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
  const SignUpButton = () => {
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
      <InputField
        label="Email Address"
        type="email"
        value={email}
        setValue={setEmail}
      />
      <InputField
        label="Password"
        type={showPassword ? "text" : "password"}
        value={pass}
        setValue={setPass}
        endAdornment={
          <EyeIcon
            isVisible={pass.length > 0}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        }
      />
      <LoginButton />
      <ResetPassword />
      <SignUpButton />
    </Box>
  );
};

export default LoginForm;
