import Post from "../models/Post.js";
import { AuthenticationError } from "apollo-server-express";
import { authUser } from "../utils/auth.js";

const commentResolvers = {
  Mutation: {
    // Create a new comment

    createComment: async (_, { postId, content }, context) => {
      const user = authUser(context);
      try {
        const post = await Post.findById(postId);

        // Add new comment to the beginning of comment array

        post.comments.unshift({
          username: user.username,
          content,
          dateCreated: new Date().toISOString(),
        });
        await post.save();
        return post;
      } catch (err) {
        throw err;
      }
    },

    // Delete a comment

    deleteComment: async (_, { postId, commentId }, context) => {
      const user = authUser(context);
      try {
        const post = await Post.findById(postId);

        // Find comment by commentId

        const commentIndex = (comment) => comment.id === commentId;
        const index = post.comments.findIndex(commentIndex);

        // Remove comment if the comment belongs to the registered user

        if (post.comments[index].username === user.username) {
          await post.comments.splice(index, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw err;
      }
    },

    // Update a comment

    updateComment: async (_, { postId, commentId, content }, context) => {
      const user = authUser(context);
      try {
        const post = await Post.findById(postId);

        // Find comment by commentId

        const commentIndex = (comment) => comment.id === commentId;
        const index = post.comments.findIndex(commentIndex);

        // Update comment if the comment belongs to the registered user

        if (post.comments[index].username === user.username) {
          post.comments[index].content = content;
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw err;
      }
    },
  },

  // Count number of commentLike based on stored data

  Comment: {
    commentLikeCount: (parent) => parent.commentLikes.length,
  },
};

export default commentResolvers;
