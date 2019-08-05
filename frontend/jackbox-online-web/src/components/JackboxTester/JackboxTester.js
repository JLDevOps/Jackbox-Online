import React, { Component } from 'react';
import classNames from "classnames";
import TypoGraphy from '@material-ui/core/Typography';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer } from "mdbreact";
import { shadows } from '@material-ui/system';
import Fab from '@material-ui/core/Fab';



export default function JackboxTester() {
  return (
    <MDBContainer style={{ boxShadow: "none"}}>
        <MDBCard style={{ marginTop: "1rem" , marginBottom: "1rem"}} >
          <MDBCardHeader color="purple" tag="h4" style={{ alignItems: "center" , textAlign: "center", fontWeight: "bold"}}>ROOM TESTER</MDBCardHeader>
            <MDBCardBody>
            <MDBCardText>
            Enter a room code to see if it's online.
            </MDBCardText>
                <div className="form-group">
                    <input className="form-control" placeholder="ENTER 4 LETTER-CODE" />
                </div>
                <MDBBtn style={{ backgroundColor: "#505050"}}>TEST</MDBBtn>
            </MDBCardBody>
          </MDBCard>
    </MDBContainer>
  );
}
