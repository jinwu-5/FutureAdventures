import User from "../models/User.js";
import Post from "../models/Post.js";
import bcrypt from "bcryptjs";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import { generateToken, authUser } from "../utilities/auth.js";

const Resolvers = {
  Query: {
    getUsers: async () => {
      try {
        return await User.find().sort({ dateCreated: -1 });
      } catch (err) {
        throw err;
      }
    },
    getUser: async (_, { userId }) => {
      try {
        return await User.findById(userId);
      } catch (err) {
        throw err;
      }
    },
    getPosts: async () => {
      try {
        return await Post.find().sort({ dateCreated: -1 });
      } catch (err) {
        throw err;
      }
    },
    getPost: async (_, { postId }) => {
      try {
        return await Post.findById(postId);
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createUser: async (_, { username, password, email }) => {
      try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new UserInputError("User exists already.");
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
          username,
          password: hashedPassword,
          email,
          dateCreated: new Date().toISOString(),
        });
        const result = await user.save();
        const authToken = generateToken(result);
        return {
          ...result._doc,
          id: result._id,
          authToken,
        };
      } catch (err) {
        throw err;
      }
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError("User not found!");
      }
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        throw new AuthenticationError("Incorrect login information!");
      }
      const authToken = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        authToken,
      };
    },
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
    createComment: async (_, { postId, content }, context) => {
      const user = authUser(context);
      try {
        const post = await Post.findById(postId);
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
    deleteComment: async (_, { postId, commentId }, context) => {
      const user = authUser(context);
      try {
        const post = await Post.findById(postId);
        const getIndex = (comment) => comment.id === commentId;
        const index = post.comments.findIndex(getIndex);
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
    updateComment: async (_, { postId, commentId, content }, context) => {
      const user = authUser(context);
      try {
        const post = await Post.findById(postId);
        const getIndex = (comment) => comment.id === commentId;
        const index = post.comments.findIndex(getIndex);
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
};

export default Resolvers;
