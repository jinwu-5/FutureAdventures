import { gql } from "apollo-server-express";

const PostSchema = gql`
  type Post {
    id: ID!
    username: String!
    content: String!
    selectedFile: String
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
    createPost(selectedFile: String, content: String!): Post!
    deletePost(postId: ID!): String!
    updatePost(postId: ID!, selectedFile: String, content: String!): Post!
  }
`;

export default PostSchema;
