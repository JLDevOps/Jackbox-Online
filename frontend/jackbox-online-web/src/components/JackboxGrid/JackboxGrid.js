import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from "../Table/Table";
import JackboxTester from "../JackboxTester/JackboxTester";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    gridContainer : {
        flexGrow: 1
    }
}));

export default function JackboxGrid(room_data) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={3}>
              <JackboxTester />
            </Grid>
            <Grid item xs={9}>
              <Table room_data={room_data}/>
            </Grid>
          </Grid>
        </div>
    );
}

