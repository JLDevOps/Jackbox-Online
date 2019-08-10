import React, { Component } from 'react';
import classNames from "classnames";
import TypoGraphy from '@material-ui/core/Typography';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer } from "mdbreact";
import { shadows } from '@material-ui/system';
import axios from 'axios';
import { MDBAlert } from 'mdbreact';


export class JackboxFinder extends React.Component {
    constructor(props) {
      super(props);
      this.state = { availability: ''};
    }

    handleChange = event => {
      if (this.input.value == null || this.input.value === false || this.input.value === "") {
        this.setState({ availability: ''});
      } else {
      axios.get("https://blobcast.jackboxgames.com/room/" + this.input.value)
        .then(response => {
          this.setState({ availability: <MDBAlert color="success" >ROOM {this.input.value } IS ONLINE.</MDBAlert>});
        })
        .catch(error => {
          this.setState({ availability: <MDBAlert color="danger" >ROOM {this.input.value } IS NOT ONLINE.</MDBAlert>});
        })
      }

    };

   render() {
     return (
    <MDBContainer style={{ boxShadow: "none"}} className="mt-5 text-center">
        <MDBCard style={{ marginTop: "1rem" , marginBottom: "1rem"}} >
          <MDBCardHeader color="purple" style={{ alignItems: "center" , textAlign: "center", fontSize: "18px", fontWeight: "700"}}><h4>ROOM FINDER</h4></MDBCardHeader>
            <MDBCardBody>
            <MDBCardText style={{ color:"black"}}>
              ENTER A ROOM CODE TO SEE IF IT'S ONLINE.
            </MDBCardText>
                <div className="form-group">
                    <input className="form-control" placeholder="ENTER 4 LETTER-CODE"  ref={(input) => this.input = input} style={{ backgroundColor: "#e0e0e0", color: "#555", textAlign: "center"}}/>
                </div>
                {this.state.availability}
                <MDBBtn size="lg" color="purple" onClick={this.handleChange} style={{backgroundColor: "white", borderRadius:"12px", margin: "10px auto", fontSize: "18px", fontWeight: "700", width: "100%", minWidth: "70px", maxWidth: "420px"}}> 
                  Find
                </MDBBtn>
            </MDBCardBody>
          </MDBCard>
    </MDBContainer>
  );
}
}
