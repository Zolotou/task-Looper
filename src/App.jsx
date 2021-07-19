import React from 'react';
import Box from '@material-ui/core/Box';
import { DropDownList, Looper } from './components';
import useStyles from './AppStyles';

function App() {
  const classes = useStyles();

  return (
    <Box className={classes.app}>
      <DropDownList />
      <Looper />
    </Box>
  );
}

export default App;
