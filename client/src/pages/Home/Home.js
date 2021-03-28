import React from "react";
import { useQuery } from "@apollo/client";
import GET_POSTS from "../../graphql/Post/GetPosts";
import { useStyles, theme } from "./styles";
import { ThemeProvider } from "@material-ui/core/styles";
import PostCard from "../../components/PostCard/PostCard";
import {
  Grid,
  CircularProgress,
  Typography,
  Container,
} from "@material-ui/core";

const Home = () => {
  const { loading, data: { getPosts: posts } = {} } = useQuery(GET_POSTS);

  const classes = useStyles();

  return loading ? (
    <CircularProgress />
  ) : (
    posts && (
      <ThemeProvider theme={theme}>
        <Grid>
          <Container component="main" className={classes.title}>
            <Typography component="h1" variant="h3" align="center">
              Future Adventures
            </Typography>

            <Typography component="h1" variant="h5" align="center">
              A space for people to share their potential future endeavors
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
      </ThemeProvider>
    )
  );
};

export default Home;
