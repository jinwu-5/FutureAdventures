import gql from "graphql-tag";

const GET_USERS = gql`
  {
    getUsers {
      id
      username
      email
      followers {
        id
        username
      }
      following {
        id
        username
      }
      followingCount
      followerCount
      dateCreated
      authToken
    }
  }
`;

export default GET_USERS;
