import User from "../models/User.js";
import Post from "../models/Post.js";
import bcrypt from "bcryptjs";
import { AuthenticationError } from "apollo-server-express";
import { generateToken } from "../utilities/auth.js";

const Resolvers = {
  Query: {
    getUsers: async () => {
      try {
        return await User.find().sort({ dateCreated: -1 });
      } catch (err) {
        throw new Error(err);
      }
    },
    getUser: async (_, { userId }) => {
      try {
        return await User.findById(userId);
      } catch (err) {
        throw new Error(err);
      }
    },
    getPosts: async () => {
      try {
        return await Post.find().sort({ dateCreated: -1 });
      } catch (err) {
        throw new Error(err);
      }
    },
    getPost: async (_, { postId }) => {
      try {
        return await Post.findById(postId);
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
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
    createUser: async (_, { username, password, email }) => {
      try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("User exists already.");
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
  },
};

export default Resolvers;
