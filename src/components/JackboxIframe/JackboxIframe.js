import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Iframe from 'react-iframe';
import classNames from "classnames";
import TypoGraphy from '@material-ui/core/Typography';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer } from "mdbreact";


const useStyles = makeStyles(theme => ({
    iframe: {
      width: '100%',
      height: '100%',
      borderRadius: '10px',
    }
}));

export default function JackboxIframe() {
  const classes = useStyles();

  return (
    <MDBContainer style={{ boxShadow: "none"}}>
        <MDBCard style={{ marginTop: "1rem" , marginBottom: "1rem", borderRadius: "5%"}} >
            <MDBCardBody>
              <Iframe url="https://jackbox.tv/" className={classes.iframe}/> 
            </MDBCardBody>
          </MDBCard>
    </MDBContainer>
  );
}
