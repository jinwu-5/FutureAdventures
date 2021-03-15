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
  },
  content: {
    marginBottom: "2%",
  },
  date: {
    display: "inline-block",
    paddingLeft: "5%",
  },
  comment: {
    marginTop: "1%",
    marginLeft: "6%",
  },
  commentContent: {
    marginTop: "2%",
  },
  optionButton: {
    marginLeft: "auto",
  },
  submitButton: {
    marginLeft: "auto",
  },
}));

export default useStyles;
