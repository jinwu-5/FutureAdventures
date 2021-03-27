import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import useStyles from "./styles";
import CREATE_USER from "../../graphql/SignUp";
import { StoreContext } from "../../store/store";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { Alert } from "@material-ui/lab";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";

const SignUpForm = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const context = useContext(StoreContext);

  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = userFormData;

  const [addUser] = useMutation(CREATE_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const validate = () => {
    if (!email || !username || !password) {
      return "All fields are required";
    }

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(String(email).toLowerCase())) {
      return "Enter a valid email address.";
    }

    const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
    if (!usernameRegex.test(username)) {
      return "Usernames can only use letters, numbers, underscores and periods";
    } else if (username.length > 20) {
      return "Username no more than 20 characters";
    }

    if (password.length < 6) {
      return "Password min 6 characters";
    }

    return false;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const error = validate();
    if (error) {
      setError(error);
      return false;
    }

    try {
      const {
        data: { createUser: userData },
      } = await addUser({
        variables: { ...userFormData },
      });
      context.login(userData);
      window.location.assign("/");
    } catch (error) {
      setError(error.graphQLErrors[0].message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonOutlineIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="username"
                variant="outlined"
                label="Username"
                required
                fullWidth
                autoFocus
                onChange={handleInputChange}
                value={username}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email Address"
                name="email"
                variant="outlined"
                required
                fullWidth
                onChange={handleInputChange}
                value={email}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={handleInputChange}
                value={password}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>

          {error && (
            <Alert severity="error" className={classes.error}>
              {error}
            </Alert>
          )}

          <Grid container justify="center">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUpForm;
