import gql from "graphql-tag";

const CREATE_POST = gql`
  mutation createPost($title: String!, $content: String!, $imageUrl: String) {
    createPost(title: $title, content: $content, imageUrl: $imageUrl) {
      id
      imageUrl
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
