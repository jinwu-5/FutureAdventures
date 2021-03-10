import gql from "graphql-tag";

const GET_USERS = gql`
  {
    getUsers {
      id
      username
      email
      followerCount
      followingCount
    }
  }
`;

export default GET_USERS;
