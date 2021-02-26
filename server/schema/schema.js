import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    profileImage: String
    followers: [Follow]
    following: [Follow]
    followingCount: Int!
    followerCount: Int!
    dateCreated: String!
    authToken: String!
  }
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
  type Follow {
    id: ID!
    username: String!
  }
  type PostLike {
    id: ID!
    username: String!
    dateCreated: String!
  }
  type Comment {
    id: ID!
    username: String!
    content: String!
    dateCreated: String!
    commentLikes: [CommentLike]!
    commentLikeCount: Int!
  }
  type CommentLike {
    id: ID!
    username: String!
    dateCreated: String!
  }
  type Query {
    getUsers: [User]
    getUser(userId: ID!): User
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation {
    createUser(
      username: String!
      password: String!
      email: String!
      profileImage: String
    ): User!
    login(username: String!, password: String!): User!
    createPost(selectedFile: String, content: String!): Post!
    deletePost(postId: ID!): String!
    updatePost(postId: ID!, selectedFile: String, content: String!): Post!
    likePost(postId: ID!): Post!
    createComment(postId: String!, content: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    updateComment(postId: ID!, commentId: ID!, content: String!): Post!
    likeComment(postId: ID!, commentId: ID!): Post!
    createFollow(userId: ID!, followerID: ID!): User!
  }
`;

export default typeDefs;
