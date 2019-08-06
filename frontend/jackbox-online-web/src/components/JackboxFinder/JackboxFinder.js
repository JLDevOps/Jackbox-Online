import React, { Component } from 'react';
import classNames from "classnames";
import TypoGraphy from '@material-ui/core/Typography';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer } from "mdbreact";
import { shadows } from '@material-ui/system';
import Fab from '@material-ui/core/Fab';
import { useState } from 'react';
import axios from 'axios';


export class JackboxFinder extends React.Component {
    constructor(props) {
      super(props);
      this.state = { availability: ''};
    }

    handleChange = event => {
      axios.get("https://blobcast.jackboxgames.com/room/" + this.input.value)
        .then(response => {
          this.setState({ availability: "ROOM " + this.input.value + " IS ONLINE."});
        })
        .catch(error => {
          this.setState({ availability: "ROOM " + this.input.value + " IS NOT ONLINE."});
        })
    };

   render() {
     return (
    <MDBContainer style={{ boxShadow: "none"}}>
        <MDBCard style={{ marginTop: "1rem" , marginBottom: "1rem"}} >
          <MDBCardHeader color="purple" tag="h4" style={{ alignItems: "center" , textAlign: "center", fontSize: "18px", fontWeight: "700"}}>ROOM FINDER</MDBCardHeader>
            <MDBCardBody>
            <MDBCardText style={{ color:"black"}}>
            Enter a room code to see if it's online.
            </MDBCardText>
                <div className="form-group">
                    <input className="form-control" placeholder="ENTER 4 LETTER-CODE"  ref={(input) => this.input = input} style={{ backgroundColor: "#e0e0e0", color: "#555"}}/>
                </div>
                <MDBBtn size="lg" color="white" onClick={this.handleChange} style={{backgroundColor: "white", borderRadius:"14px", width: "210px", margin: "10px auto", fontSize: "18px", fontWeight: "700"}}> 
                  Find
                </MDBBtn>
                <MDBCardTitle>{this.state.availability}</MDBCardTitle>
            </MDBCardBody>
          </MDBCard>
    </MDBContainer>
  );
}
}
