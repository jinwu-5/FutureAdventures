import Post from "../models/Post.js";
import { authUser } from "../utils/auth.js";

const likeResolvers = {
  Mutation: {
    // Like a post

    likePost: async (_, { postId }, context) => {
      const user = authUser(context);
      const post = await Post.findById(postId);
      const index = post.postLikes.findIndex(
        (like) => like.username === user.username
      );

      // Like the post if the post wasn't already liked by the user

      if (index === -1) {
        post.postLikes.push({
          username: user.username,
          dateCreated: new Date().toISOString(),
        });
      }

      // Delete the like if the post was already liked by the user
      else {
        post.postLikes = post.postLikes.filter(
          (like) => like.username !== user.username
        );
      }
      await post.save();
      return post;
    },

    // Like a comment

    likeComment: async (_, { postId, commentId }, context) => {
      const user = authUser(context);
      const post = await Post.findById(postId);

      // Find comment by id

      const getIndex = (comment) => comment.id === commentId;
      const commentIndex = post.comments.findIndex(getIndex);
      const index = post.comments[commentIndex].commentLikes.findIndex(
        (like) => like.username === user.username
      );

      // Like the comment if the comment wasn't already liked by the user

      if (index === -1) {
        post.comments[commentIndex].commentLikes.push({
          username: user.username,
          dateCreated: new Date().toISOString(),
        });
      }

      // Delete like if the comment was already liked by the user
      else {
        post.comments[commentIndex].commentLikes = post.comments[
          commentIndex
        ].commentLikes.filter((like) => like.username !== user.username);
      }
      await post.save();
      return post;
    },
  },
};

export default likeResolvers;
