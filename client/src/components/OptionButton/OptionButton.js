import { React, useState } from "react";
import { useMutation } from "@apollo/client";
import DELETE_POST from "../../graphql/Post/DeletePost";
import useStyles from "./styles";
import { Alert } from "@material-ui/lab";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  MenuItem,
  Menu,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";

const OptionButton = ({ user, post: { id, username } }) => {
  const [action, setAction] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const classes = useStyles();

  const [deletePost] = useMutation(DELETE_POST);

  const handleConfirmOpen = () => {
    setOpen(true);
  };

  const handleConfirmClose = () => {
    setOpen(false);
  };

  const handleAgree = async () => {
    try {
      await deletePost({
        variables: { postId: id },
      });
      window.location.assign("/");
    } catch (error) {
      setError(error.graphQLErrors[0].message);
    }
    handleConfirmClose();
  };

  const handleMenuClick = (event) => {
    setAction(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAction(null);
  };

  return (
    <div>
      {user && (
        <div>
          <MoreVertIcon
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
          />

          <Menu
            id="simple-menu"
            anchorEl={action}
            keepMounted
            open={Boolean(action)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleConfirmOpen}>Delete post</MenuItem>
            <Dialog
              open={open}
              onClose={handleConfirmClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"This is a permanent action!"}
              </DialogTitle>

              <DialogActions>
                <Button onClick={handleConfirmClose} color="primary">
                  Disagree
                </Button>

                <Button onClick={handleAgree} color="primary" autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
            {/* <MenuItem onClick={handleClose}>Update content</MenuItem>
          <MenuItem onClick={handleClose}>Follow {username}</MenuItem> */}
            {error && (
              <Alert severity="error" className={classes.error}>
                {error}
              </Alert>
            )}
          </Menu>
        </div>
      )}
    </div>
  );
};

export default OptionButton;
