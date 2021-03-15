import React from "react";
import { MenuItem, Menu, Link } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DELETE_POST from "../../graphql/DeletePost";
import { useMutation } from "@apollo/client";

const OptionButton = ({ user, post: { id, username } }) => {
  const [action, setAction] = React.useState(null);

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
      console.error(error);
    }
  };

  return (
    <div>
      <MoreVertIcon
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      />
      {user ? (
        <Menu
          id="simple-menu"
          anchorEl={action}
          keepMounted
          open={Boolean(action)}
          onClose={handleClose}
        >
          <MenuItem onClick={DeletePost}>Delete post</MenuItem>
          <MenuItem onClick={handleClose}>Update content</MenuItem>
          <MenuItem onClick={handleClose}>Follow {username}</MenuItem>
        </Menu>
      ) : (
        <Menu
          id="simple-menu"
          anchorEl={action}
          keepMounted
          open={Boolean(action)}
          onClose={handleClose}
        >
          <MenuItem href="/login" component={Link} color="disabled">
            Delete post
          </MenuItem>
          <MenuItem href="/login" component={Link} color="disabled">
            Update content
          </MenuItem>
          <MenuItem href="/login" component={Link} color="disabled">
            Follow {username}
          </MenuItem>
        </Menu>
      )}
    </div>
  );
};

export default OptionButton;
