import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    textDecoration: "none",
    color: "white",
    flexGrow: 1,
  },
  button: {},
}));

const theme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        background: "linear-gradient(45deg, #008bff 0%, #FE6B8B 90%)",
      },
    },
  },
});

export { useStyles, theme };
