import gql from "graphql-tag";

const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      postLikes {
        id
        username
        dateCreated
      }
      postLikeCount
    }
  }
`;

export default LIKE_POST;
