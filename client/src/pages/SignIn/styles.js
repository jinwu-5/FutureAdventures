import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1591205024850-d3420e30469e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjN8fHNreSUyMGlzJTIwdGhlJTIwbGltaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60)",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#F26B8A",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    margin: "1% 0% 3% 0%",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4791db",
    },
    secondary: {
      main: "#F26B8A",
    },
  },
  overrides: {
    MuiTypography: {
      h5: {
        fontFamily: "Raleway, sans-serif",
        color: "#F26B8A",
      },
    },
  },
});

export { useStyles, theme };
