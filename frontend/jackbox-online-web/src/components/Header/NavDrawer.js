import React from "react";
import Drawer from "@material-ui/core/Drawer";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { MDBBtn, MDBBtnGroup, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBRow, MDBCol } from
"mdbreact";
import Typography from "@material-ui/core/Typography";


export class NavDrawer extends React.Component {
  render() {
    return (
      <SwipeableDrawer
        anchor="top"
        open={this.props.drawerOpened}
        onClose={this.props.toggleDrawer(false)}
      >
        <div
          onClick={this.props.toggleDrawer(false)}
          onKeyDown={this.props.toggleDrawer(false)}
        >
            <MDBRow center>
            <Typography variant="h4" color="inherit" align='center'>
                jackbox.online
            </Typography>
            <MDBBtn color="amber">Button</MDBBtn>


            {/* <MDBCol xl="2" lg="3" md="4">
                <Typography variant="h4" color="inherit" align='center'>
                jackbox.online
                </Typography>
                <MDBBtnGroup vertical>
                    <MDBBtn color="amber">Button</MDBBtn>
                    <MDBBtn color="amber">Button</MDBBtn>
                    <MDBBtn color="amber">Button</MDBBtn>
                </MDBBtnGroup>
                </MDBCol> */}
            </MDBRow>
        </div>
      </SwipeableDrawer>
    );
  }
}
