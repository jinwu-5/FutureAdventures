import React from "react";
import { useMutation } from "@apollo/client";
import DELETE_COMMENT from "../../graphql/Comment/DeleteComment";
import DeleteIcon from "@material-ui/icons/Delete";

const DeleteCommentButton = ({ postId, commentId }) => {
  const [deleteComment] = useMutation(DELETE_COMMENT);

  const DeleteComment = async () => {
    try {
      await deleteComment({
        variables: { postId, commentId },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return <DeleteIcon onClick={DeleteComment} />;
};

export default DeleteCommentButton;
