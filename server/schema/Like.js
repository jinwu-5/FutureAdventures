import { gql } from "apollo-server-express";

const LikeSchema = gql`
  type PostLike {
    id: ID!
    username: String!
    dateCreated: String!
  }

  type CommentLike {
    id: ID!
    username: String!
    dateCreated: String!
  }

  extend type Mutation {
    likePost(postId: ID!): Post!
    likeComment(postId: ID!, commentId: ID!): Post!
  }
`;

export default LikeSchema;
