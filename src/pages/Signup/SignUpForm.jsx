import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import EyeIcon from "../../components/EyeIcon";
import AuthController from "../../controller/authController";
import { createSearchParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import "./signUp.scss";
const authController = new AuthController();
const SignUpForm = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleLogin = () => {
    navigate({
      pathname: "/login",
      search: createSearchParams({
        type: searchParams.get("type"),
      }).toString(),
    });
  };
  const LoginLink = () => {
    return (
      <h6
        // component={Button}
        align="center"
        className="pt-2 login-link"
        onClick={handleLogin}
      >
        Already have an account?
      </h6>
    );
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await authController.signup({
      name: name,
      email: email,
      pass: pass,
      type: searchParams.get("type"),
    });
    if (res.success) {
      handleLogin();
    } else {
      setLoading(false);
    }
  };
  const SignUpButton = () => {
    return loading === true ? (
      <Button
        type="submit"
        variant="contained"
        color="success"
        className="rounded sign-up-button"
        onClick={handleSignup}
        disabled
      >
        <CircularProgress color="inherit" size="1.5rem" />
      </Button>
    ) : (
      <Button
        type="submit"
        variant="contained"
        color="success"
        className="rounded sign-up-button"
        onClick={handleSignup}
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
      <div className="exit-button" onClick={() => navigate("/")}>
        <CancelIcon sx={{ fontSize: "2rem" }} />
      </div>
      <h1 className="form-header">{searchParams.get("type")}</h1>
      <InputField
        label="Full Name"
        type="text"
        value={name}
        setValue={setName}
      ></InputField>
      <InputField
        label="Email Address"
        type="email"
        value={email}
        setValue={setEmail}
      ></InputField>
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
      <SignUpButton />
      <LoginLink />
    </Box>
  );
};

export default SignUpForm;
