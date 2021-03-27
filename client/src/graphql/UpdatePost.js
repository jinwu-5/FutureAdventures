import gql from "graphql-tag";

const UPDATE_POST = gql`
  mutation updatePost($postId: ID!, $content: String) {
    updatePostPost(postId: $postId, content: $content) {
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

export default UPDATE_POST;
