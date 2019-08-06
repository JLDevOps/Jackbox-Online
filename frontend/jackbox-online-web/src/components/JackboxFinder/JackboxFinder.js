import React, { Component } from 'react';
import classNames from "classnames";
import TypoGraphy from '@material-ui/core/Typography';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer } from "mdbreact";
import { shadows } from '@material-ui/system';
import Fab from '@material-ui/core/Fab';
import { useState } from 'react';


export class JackboxFinder extends React.Component {
    constructor(props) {
      super(props);
      this.state = { room_code: '', isLoading: true, errors: null};
    }
    
    handleChange = event => {
      this.setState({ room_code: this.input.value });
      const response = "";
      console.log("IN fetch");

      fetch("https://blobcast.jackboxgames.com/room/" + this.input.value)
        .then(response => {response.json()})
        .then((json)=>{ console.log(json)})
        .then(data => this.setState({ room_code: this.input.value, isLoading: false}))
        .catch(error => console.log(error));

        console.log(response);
        console.log(this.input.value);
        console.log(this.error);
      
      
      
      // if (code) {
      //   this.result = <a style={{color: "red", fontSize: "18px", fontWeight: "700"}}> Room is not available. </a>;
      //   console.log("In the failed portion")
      // } else {
      //   this.result = <a style={{color: "green", fontSize: "18px", fontWeight: "700"}}> Room is available. </a>;
      // }
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
                <MDBCardTitle>{this.result}</MDBCardTitle>
            </MDBCardBody>
          </MDBCard>
    </MDBContainer>
  );
}
}
