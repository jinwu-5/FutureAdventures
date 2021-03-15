import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { IconButton, Link, CardActions } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LIKE_COMMENT from "../../graphql/LikeComment";
import useStyles from "./styles";

function CommentLikeButton({ user, postId, commentId, comment }) {
  const [liked, setLiked] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    if (
      user &&
      comment.commentLikes.find((like) => like.username === user.username)
    ) {
      setLiked(true);
    } else setLiked(false);
  }, [user, comment.commentLikes]);

  const [likePost] = useMutation(LIKE_COMMENT, {
    variables: { postId, commentId },
  });

  const likeButton = user ? (
    liked ? (
      <IconButton aria-label="like" color="secondary" onClick={likePost}>
        <FavoriteIcon />
      </IconButton>
    ) : (
      <IconButton aria-label="like" onClick={likePost}>
        <FavoriteIcon color="disabled" />
      </IconButton>
    )
  ) : (
    <IconButton aria-label="like" href="/login" component={Link}>
      <FavoriteIcon color="disabled" />
    </IconButton>
  );

  return (
    <CardActions className={classes.cardActions}>{likeButton}</CardActions>
  );
}

export default CommentLikeButton;
