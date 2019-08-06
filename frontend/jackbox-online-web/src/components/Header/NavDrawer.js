import React from "react";
import Drawer from "@material-ui/core/Drawer";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { MDBBtn, MDBBtnGroup, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBRow, MDBCol } from
"mdbreact";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { Toolbar } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CancelIcon from "@material-ui/icons/Cancel";
import CancelOutlined from "@material-ui/icons/CancelOutlined";
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import  AboutDialog  from '../About/AboutDialog';


const theme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      docked: false,
      paperAnchorDockedTop: {
        borderBottomColor: "purple"
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: "rgba(0, 0, 0, 0)",
      },
    }
  },
});

export class NavDrawer extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
      <SwipeableDrawer
        anchor="top"
        open={this.props.drawerOpened}
        onClose={this.props.toggleDrawer(false)}
        style={{borderColor: "purple"}}
        variant="persistent"
      >
        <div
          onClick={this.props.toggleDrawer(false)}
          onKeyDown={this.props.toggleDrawer(false)}
          style={{backgroundColor: "purple"}}
        >
          <Toolbar alignItems="center">
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
                        >
                            <CancelIcon fontSize="large" style={{ color: 'white'}} />
                        </IconButton>
                    </Grid>
                    <Grid item>
                      <Typography variant="h4" color="inherit" style={{ color: "white", fontWeight: "bold", fontFamily: 'Helvetica', letterSpacing: "-1.5px"}}>
                            jackbox.online
                      </Typography>
                    </Grid>
                    <Grid item>
                    </Grid>
              </Grid>
          </Toolbar>
          <Toolbar alignItems="center">
          <Grid
              container
              direction="row"
                justify="space-between"
                alignItems="center"
              >
                    <Grid item>
                    </Grid>
                    <Grid item>
                      <MDBBtnGroup vertical alignItems="center" style={{marginLeft: "65.50px"}}>
                      <MDBBtn size="lg" color="white" href="https://jackbox.tv/" target="_blank" style={{backgroundColor: "white", borderRadius:"14px", width: "210px", margin: "10px auto", fontSize: "18px", fontWeight: "700"}}> 
                        Jackbox.Tv
                      </MDBBtn>
                      <AboutDialog />
                      </MDBBtnGroup>
                    </Grid>
                    <Grid item>
                    </Grid>
              </Grid>
              </Toolbar>
        </div>
      </SwipeableDrawer>
      </ThemeProvider>
    );
  }
}
