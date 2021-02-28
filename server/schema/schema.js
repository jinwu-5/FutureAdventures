import { gql } from "apollo-server-express";
import UserSchema from "./User.js";
import PostSchema from "./Post.js";
import LikeSchema from "./Like.js";
import FollowSchema from "./Follow.js";
import CommentSchema from "./Comment.js";

const typeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  ${UserSchema}
  ${PostSchema}
  ${FollowSchema}
  ${LikeSchema}
  ${CommentSchema}
`;

export default typeDefs;
