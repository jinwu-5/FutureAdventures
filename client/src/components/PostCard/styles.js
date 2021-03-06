import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  date: {
    marginLeft: "auto",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default useStyles;
