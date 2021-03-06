import gql from "graphql-tag";

const GET_USERS = gql`
  {
    getUsers {
      id
      username
      email
      profileImage
      followers {
        username
      }
      followerCount
      following {
        username
      }
      followingCount
    }
  }
`;

export default GET_USERS;
