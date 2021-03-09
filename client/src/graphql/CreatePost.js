import gql from "graphql-tag";

const CREATE_POST = gql`
  mutation createPost(
    $title: String!
    $content: String!
    $selectedFile: String
  ) {
    createPost(title: $title, content: $content, selectedFile: $selectedFile) {
      id
      selectedFile
      title
      content
      dateCreated
      username
      postLikes {
        id
        username
        dateCreated
      }
      postLikeCount
      comments {
        id
        content
        dateCreated
        username
        commentLikes {
          id
          username
          dateCreated
        }
        commentLikeCount
      }
      commentCount
    }
  }
`;

export default CREATE_POST;
