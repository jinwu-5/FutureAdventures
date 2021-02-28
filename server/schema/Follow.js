import { gql } from "apollo-server-express";

const FollowSchema = gql`
  type Follow {
    id: ID!
    username: String!
  }

  extend type Mutation {
    createFollow(userId: ID!, followerID: ID!): User!
  }
`;

export default FollowSchema;
