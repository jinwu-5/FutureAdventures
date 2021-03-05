import React from "react";
import useStyles from "./styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function MenuAppBar() {
  const classes = useStyles();

  return (
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
          <Button color="inherit" component={Link} to="/login" variant="h6">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register" variant="h6">
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
