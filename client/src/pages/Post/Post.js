import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Container,
  CssBaseline,
} from "@material-ui/core";
import useStyles from "./styles";
import CREATE_POST from "../../graphql/CreatePost";
import { useMutation } from "@apollo/client";
import { Alert } from "@material-ui/lab";

const Post = () => {
  const classes = useStyles();

  const [postFormData, setPostFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });
  // const [selectedFile, setSelectedFile] = useState("");
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
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sharing a moment
        </Typography>
        <form noValidate className={classes.form} onSubmit={handleFormSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            label="title"
            name="title"
            required
            fullWidth
            autoFocus
            onChange={handleInputChange}
            value={title}
          />
          <TextField
            variant="outlined"
            margin="normal"
            name="content"
            label="content"
            required
            fullWidth
            onChange={handleInputChange}
            value={content}
          />
          <TextField
            variant="outlined"
            margin="normal"
            name="imageUrl"
            label="imageUrl"
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
  );
};

export default Post;
