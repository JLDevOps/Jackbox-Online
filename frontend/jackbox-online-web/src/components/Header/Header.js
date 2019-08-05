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


export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false
    };
  }
  toggleDrawer = booleanValue => () => {
    this.setState({
      drawerOpened: booleanValue
    });
  };

  render() {
    return (
      <div className="App">
        <AppBar position="static" onClick={this.toggleDrawer(true)} style={{ backgroundColor: "purple"}}>
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
                        onClick={this.toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant="h3" color="inherit" align='center' style={{ fontWeight: "bold"}}>
                            jackbox.online
                        </Typography>
                    </Grid>
                    <Grid item>
                    </Grid>
              </Grid>
          </Toolbar>
        </AppBar>
        <NavDrawer
          drawerOpened={this.state.drawerOpened}
          toggleDrawer={this.toggleDrawer}
        />
      </div>
    );
  }
}
