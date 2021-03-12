import gql from "graphql-tag";

const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
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

export default LIKE_POST;
