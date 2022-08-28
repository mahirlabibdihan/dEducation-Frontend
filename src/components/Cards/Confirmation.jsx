import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { CSSTransition } from "react-transition-group";
import React, { useState } from "react";
import "../Images/styles.scss";
const Confirmation = ({ open, setOpen, onConfirm }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to continue?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} className="red-button">
          <CloseIcon />
        </Button>
        <Button
          onClick={() => {
            handleClose();
            onConfirm();
          }}
          className="blue-button"
          autoFocus
        >
          <DoneIcon />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirmation;
