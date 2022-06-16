import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import EyeIcon from "../../components/EyeIcon";
import AuthController from "../../controller/authController";
import AuthContext from "../../store/AuthContext";
import "./signUp.scss";
const authController = new AuthController();
const SignUpForm = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    if (authCtx.loggedInAs === "") {
      navigate("/");
    }
  }, [authCtx.loggedInAs]);
  const LoginLink = () => {
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
  const handleSignup = async (e) => {
    e.preventDefault();
    const result = await authController.signup({
      name: name,
      email: email,
      pass: pass,
      type: authCtx.loggedInAs,
    });
    if (result.success) {
      navigate("/login");
    }
  };
  const SignUpButton = () => {
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
      <h1 className="form-header">{authCtx.loggedInAs}</h1>
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
