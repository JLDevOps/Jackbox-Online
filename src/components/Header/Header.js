import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { NavDrawer } from "./NavDrawer";
import { Grid } from "@material-ui/core";


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
        <AppBar position="static" onClick={toggleDrawer(true)} style={{ backgroundColor: "purple"}}>
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
                        onClick={toggleDrawer(true)}
                        >
                            <MenuIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                    <Grid item style={{marginRight: "65.50px"}}>
                        <Typography variant="h4" color="inherit" align='center' style={{ fontWeight: "bold", fontFamily: 'Helvetica', letterSpacing: "-1.5px"}}>
                            jackbox.online
                        </Typography>
                    </Grid>
                    <Grid item>
                    </Grid>
              </Grid>
          </Toolbar>
        </AppBar>
        <NavDrawer
          drawerOpened={state.drawerOpened}
          toggleDrawer={toggleDrawer}
          style={{ marginBottom: '20px'}}
        />
      </div>
    );
  }

