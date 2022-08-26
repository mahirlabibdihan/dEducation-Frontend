import React, { useState } from "react";
import { Button } from "@mui/material";
import AuthController from "../../controller/authController";
import { PasswordChangeFields } from "../InputFields";
import { RestrictedButton } from "../Buttons";
import { Zoom } from "@mui/material";
const authController = new AuthController();
const PasswordChangeForm = () => {
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const changePass = async (e) => {
    const res = await authController.changePass(currPass, newPass);
    if (res.success) {
      setCurrPass("");
      setNewPass("");
    }
  };
  return (
    // <Zoom in={true}>
    <div className="password-change">
      <PasswordChangeFields
        currPass={currPass}
        setCurrPass={setCurrPass}
        newPass={newPass}
        setNewPass={setNewPass}
      />
      <RestrictedButton
        isDisabled={currPass === "" || newPass === ""}
        onClick={changePass}
        label="Change"
      />
    </div>
    // </Zoom>
  );
};
export default PasswordChangeForm;
