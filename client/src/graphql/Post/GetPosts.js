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
    }
  }
`;

export default GET_POSTS;
