import React, { useContext } from "react";
import useStyles from "./styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { StoreContext } from "../../store/store";

export default function MenuAppBar() {
  const classes = useStyles();
  const context = useContext(StoreContext);
  return context.user ? (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
          >
            {context.user.username}
          </Typography>
          <Button color="inherit" component={Link} to="/post">
            Post
          </Button>
          <Button color="inherit" component={Link} onClick={context.logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  ) : (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
          >
            Home
          </Typography>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
