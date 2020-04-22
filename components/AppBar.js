import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EmojiFoodBeverageOutlined from '@material-ui/icons/EmojiFoodBeverageOutlined';
import ExitToAppOutlined from '@material-ui/icons/ExitToAppOutlined';
import { Button } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBarTitle: {
    flex: 1
  }
}));

export default function Navbar(props) {
  const classes = useStyles();

  return (
    <AppBar position="static" style={{backgroundColor: '#fff', color: '#000', boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)'}}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <EmojiFoodBeverageOutlined />
        </IconButton>
        <Typography className={classes.appBarTitle} variant="h6" color="inherit">
          Canteen Electronic Payment
        </Typography>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={props.logout}>
          <ExitToAppOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
