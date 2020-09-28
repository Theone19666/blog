import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { IDeleteDialog } from "./interfaces";
import React from "react";

function DeleteDialog(props: IDeleteDialog) {
  const { open, close, deletePost } = props;

  const handleClose = () => {
    close();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы действительно хотите удалить эту статью?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={deletePost} color="primary">
            Да
          </Button>
          <Button onClick={handleClose} color="primary">
            Отменить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteDialog;
