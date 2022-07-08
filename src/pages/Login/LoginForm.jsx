import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import EyeIcon from "../../components/EyeIcon";
import { login } from "../../api/authApi";
import GlobalContext from "../../store/GlobalContext";
import AuthController from "../../controller/authController";
import { useSearchParams, createSearchParams } from "react-router-dom";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const globalCtx = useContext(GlobalContext);
  const navigate = useNavigate();
  const authController = new AuthController();
  let [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    // if (globalCtx.loggedInAs === "") {
    //   navigate("/");
    // }
  }, [globalCtx.loggedInAs]);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (
      await authController.login({
        email: email,
        pass: pass,
        type: searchParams.get("type"),
      })
    ) {
      navigate("/home");
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
  const handleSignup = () => {
    navigate({
      pathname: "/signup",
      search: createSearchParams({
        type: searchParams.get("type"),
      }).toString(),
    });
  };
  const SignUpButton = () => {
    return (
      <Button
        // component={Link}
        // to="/signup"
        onClick={handleSignup}
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
      <h1 className="form-header">{searchParams.get("type")}</h1>
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
