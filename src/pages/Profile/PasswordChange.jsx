import React, { useState } from "react";
import InputField from "../../components/InputField";
import { Button } from "@mui/material";
import AuthController from "../../controller/authController";
import EyeIcon from "../../components/EyeIcon";
const authController = new AuthController();
const PasswordChange = () => {
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [currShowPass, setCurrShowPass] = useState(false);
  const [newShowPass, setNewShowPass] = useState(false);
  const changePass = async (e) => {
    const res = await authController.changePass(currPass, newPass);
    if (res.success) {
      setCurrPass("");
      setNewPass("");
    }
  };
  return (
    <div className="password-change">
      <div className="input-fields">
        {[
          {
            label: "Current Password",
            value: currPass,
            setValue: setCurrPass,
            showPassword: newShowPass,
            setShowPassword: setNewShowPass,
          },
          {
            label: "New Password",
            value: newPass,
            setValue: setNewPass,
            showPassword: currShowPass,
            setShowPassword: setCurrShowPass,
          },
        ].map((field, index) => (
          <InputField
            label={field.label}
            type={field.showPassword ? "text" : "password"}
            value={field.value}
            setValue={field.setValue}
            endAdornment={
              <EyeIcon
                isVisible={field.value.length > 0}
                showPassword={field.showPassword}
                setShowPassword={field.setShowPassword}
              />
            }
          />
        ))}
      </div>
      <Button className="save-button change-button" onClick={changePass}>
        Change
      </Button>
    </div>
  );
};
export default PasswordChange;
