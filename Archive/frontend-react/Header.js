import React from "react";
import ReactDOM from "react-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import { NavDrawer } from "./NavDrawer";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { MDBContainer } from 'mdbreact';
import { Grid } from "@material-ui/core";
// import logo from "../Image/jackbox-online-header.png";
import { ReactComponent as Logo } from "../Image/jackbox-online-logo-white.svg";
// import logo from "../Image/jackbox-online-logo-white.png";
import ReactSVG from 'react-svg';
import { makeStyles } from '@material-ui/core/styles';


// export class Header extends React.Component {
  // const useStyles = makeStyles(theme => ({
  //   root: {
  //     display: 'flex',
  //   },
  //   appBar: {
  //     zIndex: theme.zIndex.navdrawer + 1,
  //   },
  //   toolbar: theme.mixins.toolbar,
  // }));

export function Header() {
  // const classes = useStyles();
  const [state, setState] = React.useState({
    drawerOpened: false
  });

  const toggleDrawer = booleanValue => () => {
    setState({
      drawerOpened: booleanValue
    });
  };

    return (
      <div className="App">
        <AppBar position="relative" onClick={toggleDrawer(true)} style={{ backgroundColor: "purple", zIndex: "1"}} >
          <Toolbar>
              <Grid
              container
              direction="row"
                justify="space-between"
                alignItems="center"
              >
                    <Grid item>
                        <IconButton
                        color="inherit"
                        aria-label="Menu"
                        // onClick={this.toggleDrawer(true)}
                        onClick={toggleDrawer(true)}
                        >
                            <MenuIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                    <Grid item>
                      <Logo />
                      {/* <img src={'../Image/jackbox-online-logo-white.svg'} /> */}
                      {/* <ReactSVG src="./Image/jackbox-online-logo-white.svg"/> */}

                        {/* <Typography variant="h4" color="inherit" align='center' style={{ fontWeight: "bold", fontFamily: 'Helvetica'}}>
                            jackbox.online
                        </Typography> */}
                    </Grid>
                    <Grid item>
                    </Grid>
              </Grid>
          </Toolbar>
        </AppBar>
        <NavDrawer
          drawerOpened={state.drawerOpened}
          toggleDrawer={toggleDrawer}
        />
      </div>
    );
  }
