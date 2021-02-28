import User from "../models/User.js";
import { AuthenticationError } from "apollo-server-express";
import { authUser } from "../utils/auth.js";

const followResolvers = {
  // Create follower/following

  Mutation: {
    createFollow: async (_, { userId, followerID }, context) => {
      const authfollower = authUser(context);
      const follower = await User.findById(followerID);

      if (authfollower.username === follower.username) {
        const user = await User.findById(userId);
        const index = user.followers.findIndex(
          (follow) => follow.username === follower.username
        );

        // Follow the user if the user wasn't already followed.

        if (index === -1) {
          user.followers.push({
            username: follower.username,
          });

          // Add user to follower's following array

          follower.following.push({
            username: user.username,
          });
        }

        // Cancel follow if the user was already followed.
        else {
          user.followers = user.followers.filter(
            (follow) => follow.username !== follower.username
          );

          // Remove user from follower's following array

          follower.following = follower.following.filter(
            (follow) => follow.username !== user.username
          );
        }
        await user.save(), follower.save();
        return user;
      } else {
        throw new AuthenticationError("Action not allowed");
      }
    },
  },
};

export default followResolvers;
