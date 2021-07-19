import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  actionButton: {
    marginLeft: "5%",
  },
  selectTitle: {
    textAlign: 'left',
    color: "grey",
    padding:  "6px 16px",
  },
  trackList: {
    maxHeight: '80vh',
    overflowY: 'auto',
  },
  buttonWrapper: {
    minWidth: 285,
    display: 'flex',
    justifyContent: 'flex-start',
  },
}));

export default useStyles;
