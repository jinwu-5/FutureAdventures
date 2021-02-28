import { gql } from "apollo-server-express";

const CommentSchema = gql`
  type Comment {
    id: ID!
    username: String!
    content: String!
    dateCreated: String!
    commentLikes: [CommentLike]!
    commentLikeCount: Int!
  }

  extend type Mutation {
    createComment(postId: String!, content: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    updateComment(postId: ID!, commentId: ID!, content: String!): Post!
  }
`;

export default CommentSchema;
