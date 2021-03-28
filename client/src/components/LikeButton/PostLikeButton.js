import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import LIKE_POST from "../../graphql/Post/LikePost";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { IconButton, CardActions } from "@material-ui/core";

function PostLikeButton({ user, post: { id, postLikes } }) {
  const [liked, setLiked] = useState(false);

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
    <IconButton aria-label="like" href="/login">
      <FavoriteIcon color="disabled" />
    </IconButton>
  );

  return <CardActions>{likeButton}</CardActions>;
}

export default PostLikeButton;
