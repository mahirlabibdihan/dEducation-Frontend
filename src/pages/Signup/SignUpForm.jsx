import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import EyeIcon from "../../components/EyeIcon";
import AuthController from "../../controller/authController";
import GlobalContext from "../../store/GlobalContext";
import "./signUp.scss";
import { createSearchParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { CircularProgress } from "@mui/material";
const authController = new AuthController();
const cookies = new Cookies();
const SignUpForm = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const globalCtx = useContext(GlobalContext);
  const type = cookies.get("type");
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
    const result = await authController.signup({
      name: name,
      email: email,
      pass: pass,
      type: searchParams.get("type"),
    });
    if (result.success) {
      handleLogin();
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
        Login
      </Button>
    );
  };
  return (
    <Box
      component="form"
      className={`w-25 p-5 rounded shadow sign-up-form ${props.className}`}
    >
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
