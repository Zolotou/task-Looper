import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Box from "@material-ui/core/Box";
import Slider from "@material-ui/core/Slider";
import VolumeUp from "@material-ui/icons/VolumeUp";
import PauseIcon from "@material-ui/icons/Pause";
import { observer } from "mobx-react-lite";
import trackState from "../../store/tracksState";
import useStyles from "./TrackCardStyles";



const TrackCard = observer(({trackID, loop}) => {
  const classes = useStyles();
  const [intervalID, setIntervalID] = useState(null);
  const [value, setValue] = useState(30);
  let [playedTime, setPlayedTime] = useState(0);
  
  const currentTrack = trackState.trackList.find(item => item.id === trackID)

  const {
    id,
    audio: { duration, paused },
    owner,
    bpm,
    bits
  } = currentTrack;
  
  const handleVolume = useCallback((event, newValue) => {
    setValue(newValue);
    trackState.handleVolume(id, newValue / 100);
  }, []);

  useEffect(() => {
    if(playedTime === Math.floor(duration) || loop){
      clearInterval(intervalID)
      setIntervalID(null)
      setPlayedTime(0)
    }
  }, [playedTime])

  const handlePlay = useCallback(() => {
    trackState.handleTrack(id);
    if(intervalID){
      clearInterval(intervalID);
      return setIntervalID(null);
    }
    const currentIntevalID = setInterval(() => {
      setPlayedTime(playedTime++)
    }, 1000)
    setIntervalID(currentIntevalID)
  }, [intervalID]);

  const handleDelete = () => {
    trackState.removeTrack(id);
  };


  return (
    <Card className={classes.root}>
      <Box className={classes.controls}>
        <IconButton
          style={{
            background: `linear-gradient(to right, #3f51b5 ${playedTime * 100 / duration}% , white 1%)`,
          }}
          className={classes.playIcon}
          onClick={handlePlay}
          aria-label="play/pause"
        >
          {paused  ? <PlayArrowIcon /> : <PauseIcon />}
        </IconButton>
      </Box>
      <CardContent className={classes.content}>
        <Typography component="h6" variant="h6">
          {owner}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          BPM: {bpm}
        </Typography>
      </CardContent>
      <Box>
        <Box className={classes.details}>
          <Typography variant="subtitle1" color="textSecondary">
            BITS: { bits }
          </Typography>
          <IconButton aria-label="delete">
            <DeleteOutlineOutlinedIcon onClick={handleDelete} />
          </IconButton>
        </Box>
        <Box className={classes.volume}>
          <VolumeUp />
          <Slider
            value={value}
            onChange={handleVolume}
            aria-labelledby="continuous-slider"
          />
        </Box>
      </Box>
    </Card>
  );
})

TrackCard.propTypes = {
  trackID: PropTypes.string 
};

export default TrackCard;
