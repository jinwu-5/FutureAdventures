import { gql } from "apollo-server-express";

const PostSchema = gql`
  type Post {
    id: ID!
    username: String!
    title: String
    content: String!
    imageUrl: String
    dateCreated: String!
    postLikes: [PostLike]!
    postLikeCount: Int!
    comments: [Comment]!
    commentCount: Int
  }

  extend type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }

  extend type Mutation {
    createPost(title: String!, content: String!, imageUrl: String): Post!
    deletePost(postId: ID!): String!
    updatePost(postId: ID!, content: String): Post!
  }
`;

export default PostSchema;
