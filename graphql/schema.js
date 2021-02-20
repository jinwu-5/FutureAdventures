import gql from "graphql-tag";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    dateCreated: String!
    email: String!
    authToken: String!
  }
  type GetUser {
    id: ID!
    username: String!
    dateCreated: String!
    email: String!
  }
  type Post {
    id: ID!
    username: String!
    content: String!
    dateCreated: String!
    comments: [Comment]!
    postLikes: [PostLike]!
    postLikeCount: Int!
    commentCount: Int!
    commentLikes: [CommentLike]!
    commentLikeCount: Int!
  }
  type Comment {
    id: ID!
    dateCreated: String!
    username: String!
    content: String!
  }
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
  type Query {
    getUsers: [GetUser]
    getUser(userId: ID!): GetUser
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation {
    createUser(username: String!, password: String!, email: String!): User!
    login(username: String!, password: String!): User!
    createPost(content: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, content: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    likeComment(commentID: ID!): Comment!
  }
`;

export default typeDefs;
