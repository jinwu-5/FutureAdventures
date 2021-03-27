import gql from "graphql-tag";

const CREATE_POST = gql`
  mutation createPost($title: String!, $content: String!, $imageUrl: String) {
    createPost(title: $title, content: $content, imageUrl: $imageUrl) {
      imageUrl
      title
      content
    }
  }
`;

export default CREATE_POST;
