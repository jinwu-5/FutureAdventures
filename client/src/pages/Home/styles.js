import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: "2% 15%",
    fontFamily: "-apple-system",
    textAlign: "center",
    color: "pink",
    fontSize: 50,
  },
  container: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
  },
}));

export default useStyles;
