import Post from "../models/Post.js";
import { AuthenticationError } from "apollo-server-express";
import { authUser } from "../utils/auth.js";

const postResolvers = {
  Query: {
    // Get all posts

    getPosts: async () => {
      try {
        return await Post.find().sort({ dateCreated: -1 });
      } catch (err) {
        throw err;
      }
    },

    // Get post by postId

    getPost: async (_, { postId }) => {
      try {
        return await Post.findById(postId);
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    // Create a new post (selectedFile is not a required input)

    createPost: async (_, { content, selectedFile }, context) => {
      const user = authUser(context);
      const newPost = new Post({
        user: user.id,
        username: user.username,
        selectedFile,
        content,
        dateCreated: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },

    // Delete a post

    deletePost: async (_, { postId }, context) => {
      const user = authUser(context);
      try {
        const post = await Post.findById(postId);
        if (post.username === user.username) {
          await post.deleteOne({ _id: postId });
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw err;
      }
    },

    // Update a post

    updatePost: async (_, { postId, content }, context) => {
      const user = authUser(context);
      try {
        const post = await Post.findById(postId);
        if (post.username === user.username) {
          await post.updateOne({ content });
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw err;
      }
    },
  },

  // Count number of comment/postLike based on stored data

  Post: {
    commentCount: (parent) => parent.comments.length,
    postLikeCount: (parent) => parent.postLikes.length,
  },
};

export default postResolvers;
