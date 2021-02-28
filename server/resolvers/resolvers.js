import userResolvers from "./User.js";
import postResolvers from "./Post.js";
import commentResolvers from "./Comment.js";
import likeResolvers from "./Like.js";
import followResolvers from "./Follow.js";

const Resolvers = {
  Query: {
    ...userResolvers.Query,
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
    ...likeResolvers.Mutation,
    ...followResolvers.Mutation,
  },
  User: {
    ...userResolvers.User,
  },
  Post: {
    ...postResolvers.Post,
  },
  Comment: {
    ...commentResolvers.Comment,
  },
};

export default Resolvers;
