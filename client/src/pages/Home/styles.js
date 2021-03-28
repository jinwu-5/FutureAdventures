import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "10px 50px",
  },
  title: {
    padding: "5% 10%",
    color: "#8982B0",
  },
}));

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      h3: {
        fontFamily: "Cinzel Decorative, sans-serif",
      },
      h5: {
        fontFamily: "Raleway, sans-serif",
      },
    },
  },
});

export { useStyles, theme };
