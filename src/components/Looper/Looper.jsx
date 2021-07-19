import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { observer } from "mobx-react-lite";
import trackState from "../../store/tracksState";
import TrackCard from "../TrackCard";
import useStyles from "./LooperStyles";

const Looper = observer(() => {
  const classes = useStyles();

  const [playAll, setPlayAll] = useState(false);
  const [sync, setSync] = useState(false);

  const handlePlayAll = () => {
    setPlayAll(!playAll)
    trackState.handlePlayAll();
  };

  const handleSync = () => {
    setSync(!sync);
    trackState.handleSync(!sync);
  };

  return (
    <Box>
      <Box className={classes.buttonWrapper}>
        <Button onClick={handleSync} variant={sync ? "outlined" : null}>
          Sync
        </Button>
        <Button
          onClick={handlePlayAll}
          className={classes.actionButton}
          variant={trackState.loop ? "outlined" : null}
        >
          {trackState.loop ? "Stop All" : "Play All"}
        </Button>
      </Box>
      <Typography className={classes.selectTitle}>Select track</Typography>
      <Box className={classes.trackList}>
        {trackState?.trackList?.length === 0
          ? "No tracks in list"
          : trackState.trackList.map((track) => (
              <TrackCard
                key={track.id}
                trackID={track.id}
                loop = {playAll}
              />
            ))}
      </Box>
    </Box>
  );
});

export default Looper;
