import React, { Component } from 'react';
import classNames from "classnames";
import TypoGraphy from '@material-ui/core/Typography';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer } from "mdbreact";
import { shadows } from '@material-ui/system';
import Fab from '@material-ui/core/Fab';
import { useState } from 'react';


export default function JackboxTester() {
    const [input, setInput] = useState(''); // '' is the initial state value

    function fetch() {
        return new Promise(resolve => setTimeout(() => resolve(42), 1000));
      }
    
    function fetchAPI(param) {
    // param is a highlighted word from the user before it clicked the button
        return fetch("ttps://blobcast.jackboxgames.com/room/" + param);
    }

    // buttonClicked = () => {
    //     let roomCode = window.getSelection().toString();
    //     fetchAPI(roomCode).then(result => {
    //         this.setState({ result })
    //     }
    // }


  return (
    <MDBContainer style={{ boxShadow: "none"}}>
        <MDBCard style={{ marginTop: "1rem" , marginBottom: "1rem"}} >
          <MDBCardHeader color="purple" tag="h4" style={{ alignItems: "center" , textAlign: "center", fontWeight: "bold"}}>ROOM TESTER</MDBCardHeader>
            <MDBCardBody>
            <MDBCardText>
            Enter a room code to see if it's online.
            </MDBCardText>
                <div className="form-group">
                    <input className="form-control" placeholder="ENTER 4 LETTER-CODE" value={input} onInput={e => setInput(e.target.value)}/>
                </div>
                <MDBBtn style={{ backgroundColor: "#505050"}} >Submit</MDBBtn>
            </MDBCardBody>
          </MDBCard>
    </MDBContainer>
  );
}
