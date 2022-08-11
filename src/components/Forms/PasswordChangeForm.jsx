import React, { useState } from "react";
import { Button } from "@mui/material";
import AuthController from "../../controller/authController";
import { PasswordChangeFields } from "../InputFields";
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
    <div className="password-change">
      <PasswordChangeFields
        currPass={currPass}
        setCurrPass={setCurrPass}
        newPass={newPass}
        setNewPass={setNewPass}
      />
      <Button className="blue-button full-width" onClick={changePass}>
        Change
      </Button>
    </div>
  );
};
export default PasswordChangeForm;
