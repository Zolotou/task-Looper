import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    borderRadius: "0",
    borderBottom: "1px solid black",
  },
  details: {
    display: "flex",
    alignItems: "center"
  },
  content: {
    flex: "1 0 auto",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  volume: {
    display: "flex",
    alignItems: "center",
    width: "80px",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 50,
    width: 50,
    border: "1px solid",
    borderRadius: "50%",
  },
}));

export default useStyles;
