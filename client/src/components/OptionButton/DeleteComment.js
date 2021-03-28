import { React, useState } from "react";
import { useMutation } from "@apollo/client";
import DELETE_COMMENT from "../../graphql/Comment/DeleteComment";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, Dialog, DialogTitle, DialogActions } from "@material-ui/core";

const DeleteCommentButton = ({ postId, commentId }) => {
  const [deleteComment] = useMutation(DELETE_COMMENT);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = async () => {
    try {
      await deleteComment({
        variables: { postId, commentId },
      });
    } catch (error) {
      console.error(error);
    }
    handleClose();
  };

  return (
    <div>
      <DeleteIcon variant="outlined" onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"This is a permanent action!"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleAgree} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteCommentButton;
