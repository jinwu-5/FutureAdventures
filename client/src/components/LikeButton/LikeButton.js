import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { IconButton, Link, CardActions } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LIKE_POST from "../../graphql/LikePost";
import useStyles from "./styles";

function PostLikeButton({ user, post: { id, postLikes } }) {
  const [liked, setLiked] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    if (user && postLikes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, postLikes]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
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

export default PostLikeButton;
