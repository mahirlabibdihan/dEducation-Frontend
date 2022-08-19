import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const UploadConfirmation = ({ open, setOpen, onConfirm }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to change your profile picture?
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
    </div>
  );
};

export default UploadConfirmation;
