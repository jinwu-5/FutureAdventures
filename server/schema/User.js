import { gql } from "apollo-server-express";

const UserSchema = gql`
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

  extend type Query {
    getUsers: [User]
    getUser(userId: ID!): User
  }

  extend type Mutation {
    createUser(
      username: String!
      password: String!
      email: String!
      profileImage: String
    ): User!
    login(username: String!, password: String!): User!
  }
`;

export default UserSchema;
