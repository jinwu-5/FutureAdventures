import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1200,
    position: "relative",
    margin: "7% 15%",
  },
  media: {
    paddingTop: "100%",
    marginBottom: "5%",
  },
  username: {
    display: "inline-block",
    paddingRight: "5%",
    marginBottom: "2%",
  },
  content: {
    marginBottom: "2%",
  },
  date: {
    display: "inline-block",
    paddingLeft: "10",
  },
  overlay: {
    position: "absolute",
    top: "1%",
    right: "5px",
  },
}));

export default useStyles;
