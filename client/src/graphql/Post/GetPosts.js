import gql from "graphql-tag";

const GET_POSTS = gql`
  {
    getPosts {
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
      commentCount
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
    }
  }
`;

export default GET_POSTS;
