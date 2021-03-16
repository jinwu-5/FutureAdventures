import React from "react";
import { useQuery } from "@apollo/client";
import PostCard from "../../components/PostCard/PostCard";
import GET_POSTS from "../../graphql/GetPosts";
import {
  Grid,
  CircularProgress,
  Typography,
  Container,
} from "@material-ui/core";
import useStyles from "./styles";

function Home() {
  const { loading, data: { getPosts: posts } = {} } = useQuery(GET_POSTS);
  const classes = useStyles();

  return loading ? (
    <CircularProgress />
  ) : (
    posts && (
      <Grid>
        <Container component="main" className={classes.title}>
          <Typography component="h1" variant="h2" align="center">
            Future Adventures
          </Typography>
          <Typography component="h1" variant="h5" align="center">
            This is a space for people to share the adventurous stuff that they
            want to try in the future.
          </Typography>
        </Container>
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts.map((post) => (
            <Grid key={post.id} item xs={12} sm={6} md={4}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    )
  );
}

export default Home;
