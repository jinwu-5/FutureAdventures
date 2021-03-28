import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  deleteButtonOverlay: {
    position: "absolute",
    top: "58%",
    right: "3px",
  },
}));

export default useStyles;
