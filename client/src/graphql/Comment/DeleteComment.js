import gql from "graphql-tag";

const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
      }
    }
  }
`;

export default DELETE_COMMENT;
