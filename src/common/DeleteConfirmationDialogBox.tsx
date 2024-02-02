import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { DialogProps } from "../interface/type";

function DeleteConfirmationDialogBox({
  deleteDialogConfirmationOpen,
  handleDeleteCancel,
  handleDeleteClickConfirm,
}: DialogProps) {
  return (
    <Dialog
      open={deleteDialogConfirmationOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteClickConfirm}>Agree</Button>
        <Button onClick={handleDeleteCancel} autoFocus>
          Disagree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmationDialogBox;
