import React, { useState } from "react";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { musicData } from "../../constants";
import trackState from "../../store/tracksState";
import useStyles from "./DropDownListStyles";

const DropDownList = (props) => {
  const classes = useStyles();
  const [track, setTrack] = useState("");
  const handleClose = (event) => {
    if (event.target.value === undefined) {
      return null;
    }
  };
  const handleChange = (event) => {
    trackState.addTrack(event.target.value);
    setTrack(event.target.value);
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Add Track</InputLabel>
      <Select value={track} onChange={handleChange} onClose={handleClose}>
        {musicData.map(({ id, owner }) => (
          <MenuItem key={id} value={id}>{owner}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

DropDownList.propTypes = {};

export default DropDownList;
