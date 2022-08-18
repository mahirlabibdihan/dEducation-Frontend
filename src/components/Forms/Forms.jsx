import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import InputField from "../InputFields/InputField";
import EyeIcon from "../Icons/EyeIcon";
import GlobalContext from "../../store/GlobalContext";
import AuthController from "../../controller/authController";
import { useSearchParams, createSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./Forms.scss";
import { RoleSelectionField } from "../InputFields";
const authController = new AuthController();

const ResetPassword = () => {
  return (
    <Typography
      component={Link}
      to="/"
      align="center"
      className="pt-2 pb-3 border-bottom reset-password"
    >
      Forgot Password?
    </Typography>
  );
};

const PasswordField = ({ pass, setPass }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
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
  );
};

const LoginButton = ({ email, pass, type }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const res = await authController.login({
      email: email,
      pass: pass,
      type: type,
    });
    if (res.success) {
      navigate("/home");
    } else {
      setLoading(false);
    }
  };

  return loading === true ? (
    <Button
      type="submit"
      variant="contained"
      className="blue-button full-width login-button"
      onClick={handleLogin}
      disabled
    >
      <CircularProgress color="inherit" size="1.5rem" />
    </Button>
  ) : (
    <Button
      type="submit"
      variant="contained"
      className="blue-button full-width login-button"
      onClick={handleLogin}
    >
      Login
    </Button>
  );
};

const EmailField = ({ email, setEmail }) => (
  <InputField
    label="Email Address"
    type="email"
    value={email}
    setValue={setEmail}
  />
);
export const LoginForm = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const [type, setType] = useState(searchParams.get("type"));
  const SignUpButton = ({ type }) => {
    const navigate = useNavigate();
    const handleSignup = () => {
      navigate({
        pathname: "/signup",
        search: createSearchParams({
          type: type,
        }).toString(),
      });
    };
    return (
      <Button
        // component={Link}
        // to="/signup"
        onClick={handleSignup}
        variant="contained"
        color="success"
        className="green-button sign-up-button"
      >
        Create New Account
      </Button>
    );
  };
  useEffect(() => {
    if (type !== searchParams.get("type")) {
      searchParams.set("type", type);
      setSearchParams(searchParams);
    }
  }, [type]);
  useEffect(() => {
    if (searchParams.get("type") === null) navigate("/");
    else setType(searchParams.get("type"));
  }, [searchParams, props]);

  return (
    <Box
      component="form"
      className={`w-25 p-5 rounded shadow login-form ${props.className}`}
    >
      <div className="exit-button" onClick={() => navigate("/")}>
        <CloseOutlinedIcon sx={{ fontSize: "1.7rem" }} />
      </div>
      <RoleSelectionField value={type} setValue={setType} />
      <EmailField email={email} setEmail={setEmail} />
      <PasswordField pass={pass} setPass={setPass} />
      <LoginButton email={email} pass={pass} type={type} />
      <ResetPassword />
      <SignUpButton type={type} />
    </Box>
  );
};

const NameField = ({ name, setName }) => (
  <InputField
    label="Full Name"
    type="text"
    value={name}
    setValue={setName}
  ></InputField>
);

const LoginLink = ({ type, handleLogin }) => {
  return (
    <Typography
      // component={Link}
      onClick={handleLogin}
      align="center"
      className="pt-2 pb-3 border-bottom reset-password"
    >
      Already have an account?
    </Typography>
  );
};

export const SignUpForm = (props) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [type, setType] = useState(searchParams.get("type"));
  const SignUpButton = ({ name, email, pass, type, handleLogin }) => {
    const [loading, setLoading] = useState(false);
    const handleSignup = async (e) => {
      e.preventDefault();
      setLoading(true);
      const res = await authController.signup({
        name: name,
        email: email,
        pass: pass,
        type: type,
      });
      if (res.success) {
        handleLogin();
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    return loading === true ? (
      <Button
        type="submit"
        variant="contained"
        color="success"
        className="green-button sign-up-button"
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
        className="green-button sign-up-button"
        onClick={handleSignup}
      >
        Sign Up
      </Button>
    );
  };
  useEffect(() => {
    if (type !== searchParams.get("type")) {
      searchParams.set("type", type);
      setSearchParams(searchParams);
    }
  }, [type]);
  useEffect(() => {
    if (searchParams.get("type") === null) navigate("/");
    else setType(searchParams.get("type"));
  }, [props, searchParams]);

  const handleLogin = () => {
    navigate({
      pathname: "/login",
      search: createSearchParams({
        type: type,
      }).toString(),
    });
  };
  return (
    <Box
      component="form"
      className={`w-25 p-5 rounded shadow sign-up-form ${props.className}`}
    >
      <div className="exit-button" onClick={() => navigate("/")}>
        <CloseOutlinedIcon sx={{ fontSize: "1.7rem" }} />
      </div>
      <RoleSelectionField value={type} setValue={setType} />
      {/* <h1 className="form-header">{type}</h1> */}
      <NameField name={name} setName={setName} />
      <EmailField email={email} setEmail={setEmail} />
      <PasswordField pass={pass} setPass={setPass} />
      <SignUpButton
        name={name}
        email={email}
        pass={pass}
        type={type}
        handleLogin={handleLogin}
      />
      <LoginLink type={type} handleLogin={handleLogin} />
    </Box>
  );
};
