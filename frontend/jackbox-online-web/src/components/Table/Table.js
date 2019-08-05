import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { DeveloperBoardRounded, BorderAllRounded, PlayCircleFilledWhite } from '@material-ui/icons';
import { MDBDataTable, MDBTableHead } from 'mdbreact';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer } from "mdbreact";


const DatatablePage = (room_data) => {
    const data = {
      columns: [
        {
          label: 'ROOM',
          field: 'room_code',
          sort: 'asc',
          width: 150
        }, 
        {
          label: 'GAME TYPE',
          field: 'game_type',
          sort: 'asc',
          width: 270
        },
        {
          label: 'CURRENT # OF PLAYERS',
          field: 'player_amount',
          sort: 'asc',
        },
        {
          label: 'CURRENT # OF AUDIENCE',
          field: 'audience_amount',
          sort: 'asc',
        },
        {
          label: 'JOIN AS',
          field: 'join_able',
          sort: 'asc',
        },
        {
          label: 'LOCKED',
          field: 'locked',
          sort: 'asc',
        },
        {
          label: 'LAST UPDATED',
          field: 'last_updated',
          sort: 'asc',
        }
      ],
      rows: room_data.room_data.room_data.map(
          room => {
              return {
                  room_code: room.room_code,
                  game_type: room.game_type,
                  player_amount: room.player_amount,
                  audience_amount: room.audience_amount,
                  join_able: room.join_able,
                  locked: room.locked,
                  last_updated: room.last_updated
              }
          }
      )
    };

    return (
      <MDBContainer>
        <MDBCard style={{ marginTop: "1rem" , marginBottom: "1rem"}} >
          <MDBCardHeader color="purple" tag="h4" style={{ alignItems: "center" , textAlign: "center", fontWeight: "bold"}}>ROOM SERVERS</MDBCardHeader>
          <MDBCardBody>    
            <MDBDataTable
              striped
              hover
              data={data}
              responsive
              autoWidth
              entriesOptions={[ 5, 10, 25, 50, 100 ]}
              maxHeight="100px"
              searchLabel="Room"
              theadColor="grey"
              theadTextWhite
              style={{ borderRadius: "30%"}} 
            />
          </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    );
  }

  
export default DatatablePage;
