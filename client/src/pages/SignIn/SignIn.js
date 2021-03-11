import React, { useState, useContext } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Grid,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import LOGIN from "../../graphql/SignIn";
import { useMutation } from "@apollo/client";
import { Alert } from "@material-ui/lab";
import { StoreContext } from "../../store/store";

const SignInForm = () => {
  const context = useContext(StoreContext);
  const classes = useStyles();
  const [error, setError] = useState("");
  const [userFormData, setUserFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = userFormData;

  const [signIn] = useMutation(LOGIN);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    setError("");

    try {
      const {
        data: { login: userData },
      } = await signIn({
        variables: { ...userFormData },
      });
      context.login(userData);
      window.location.assign("/");
    } catch (error) {
      setError(error.graphQLErrors[0].message);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              label="Username"
              name="username"
              required
              fullWidth
              autoFocus
              onChange={handleInputChange}
              value={username}
            />
            <TextField
              variant="outlined"
              margin="normal"
              name="password"
              label="Password"
              type="password"
              required
              fullWidth
              onChange={handleInputChange}
              value={password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            {error && (
              <Alert severity="error" className={classes.error}>
                {error}
              </Alert>
            )}
            <Grid container justify="center">
              <Grid item>
                <Link href="/Register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignInForm;
