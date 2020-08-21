import React from "react";
import { useHistory } from "react-router-dom";
import NavbarAuth from "../auth/NavbarAuth";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

export default function Navigation() {
    const classes = useStyles();
    const history = useHistory();
    const home = () => history.push("/");

  return (
    <AppBar position="static">
    <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title} onClick={home}>
        OnlineShop
    </Typography>
    <NavbarAuth />
    </Toolbar>
    </AppBar>
  );
}
