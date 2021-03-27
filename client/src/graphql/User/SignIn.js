import gql from "graphql-tag";

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      dateCreated
      authToken
    }
  }
`;

export default LOGIN;
