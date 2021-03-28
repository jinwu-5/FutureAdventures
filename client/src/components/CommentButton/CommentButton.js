import React, { useEffect, useState } from "react";
import CommentIcon from "@material-ui/icons/Comment";
import { CardActions } from "@material-ui/core";

function CommentButton({ user, post: { comments } }) {
  const [commented, setCommented] = useState(false);

  useEffect(() => {
    if (
      user &&
      comments.find((comment) => comment.username === user.username)
    ) {
      setCommented(true);
    } else setCommented(false);
  }, [user, comments]);

  const icon =
    user && commented ? (
      <CommentIcon color="primary" />
    ) : (
      <CommentIcon color="disabled" />
    );

  return <CardActions>{icon}</CardActions>;
}

export default CommentButton;
