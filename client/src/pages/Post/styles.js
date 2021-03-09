import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    width: "100%",
    "& > * + *": {},
  },
}));

export default useStyles;
