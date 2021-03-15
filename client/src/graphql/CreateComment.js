import gql from "graphql-tag";

const CREATE_COMMENT = gql`
  mutation createComment($postId: String!, $content: String!) {
    createComment(postId: $postId, content: $content) {
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

export default CREATE_COMMENT;
