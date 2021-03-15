import { makeStyles } from "@material-ui/core/styles";

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
    color: "pink",
  },
}));

export default useStyles;
