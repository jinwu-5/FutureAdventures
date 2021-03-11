import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
    position: "relative",
  },
  media: {
    paddingTop: "80%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  username: {
    display: "inline-block",
    paddingRight: "5%",
  },
  date: {
    display: "inline-block",
    paddingLeft: "5%",
  },
  comment: {
    marginTop: "1%",
    marginLeft: "6%",
  },
  overlay: {
    position: "absolute",
    top: "65%",
    left: "84%",
  },
}));

export default useStyles;
