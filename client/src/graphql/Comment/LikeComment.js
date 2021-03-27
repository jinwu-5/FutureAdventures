import gql from "graphql-tag";

const LIKE_COMMENT = gql`
  mutation likeComment($postId: ID!, $commentId: ID!) {
    likeComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        commentLikes {
          id
          username
        }
        commentLikeCount
      }
    }
  }
`;

export default LIKE_COMMENT;
