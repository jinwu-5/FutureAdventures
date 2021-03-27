import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import DELETE_POST from "../../graphql/Post/DeletePost";
import useStyles from "./styles";
import { Alert } from "@material-ui/lab";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { MenuItem, Menu } from "@material-ui/core";

const OptionButton = ({ user, post: { id, username } }) => {
  const [action, setAction] = React.useState(null);
  const [error, setError] = useState("");
  const classes = useStyles();

  const handleClick = (event) => {
    setAction(event.currentTarget);
  };

  const handleClose = () => {
    setAction(null);
  };

  const [deletePost] = useMutation(DELETE_POST);

  const DeletePost = async () => {
    try {
      await deletePost({
        variables: { postId: id },
      });
      window.location.assign("/");
    } catch (error) {
      setError(error.graphQLErrors[0].message);
    }
  };

  return (
    <div>
      {user && (
        <div>
          <MoreVertIcon
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          />
          <Menu
            id="simple-menu"
            anchorEl={action}
            keepMounted
            open={Boolean(action)}
            onClose={handleClose}
          >
            <MenuItem onClick={DeletePost}>Delete post</MenuItem>
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
