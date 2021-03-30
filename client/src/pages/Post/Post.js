import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import useStyles from "./styles";
import { theme } from "../SignIn/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import CREATE_POST from "../../graphql/Post/CreatePost";
import { Alert } from "@material-ui/lab";
import {
  Typography,
  TextField,
  Button,
  Container,
  CssBaseline,
} from "@material-ui/core";

const Post = () => {
  const classes = useStyles();

  const [postFormData, setPostFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  const [error, setError] = useState("");

  const { title, content, imageUrl } = postFormData;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostFormData({ ...postFormData, [name]: value });
  };

  const [createPost] = useMutation(CREATE_POST);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    setError("");
    try {
      await createPost({
        variables: { ...postFormData },
      });
      window.location.assign("/");
    } catch (error) {
      setError(error.graphQLErrors[0].message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sharing a future adventure
          </Typography>

          <form noValidate className={classes.form} onSubmit={handleFormSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              label="title"
              name="title"
              autoFocus
              required
              fullWidth
              onChange={handleInputChange}
              value={title}
            />

            <TextField
              variant="outlined"
              margin="normal"
              label="content"
              name="content"
              required
              fullWidth
              multiline
              rows="12"
              onChange={handleInputChange}
              value={content}
            />

            <TextField
              variant="outlined"
              margin="normal"
              name="imageUrl"
              label="imageUrl"
              size="small"
              required
              fullWidth
              onChange={handleInputChange}
              value={imageUrl}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              submit
            </Button>

            {error && (
              <Alert severity="error" className={classes.error}>
                {error}
              </Alert>
            )}
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default Post;
