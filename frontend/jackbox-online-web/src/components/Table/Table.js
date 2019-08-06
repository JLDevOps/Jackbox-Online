import React from 'react';
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
          <MDBCardHeader color="purple" tag="h4" style={{ alignItems: "center" , textAlign: "center", fontSize: "18px", fontWeight: "700"}}>ROOM SERVERS</MDBCardHeader>
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
              theadColor="purple"
              theadTextWhite
              style={{ borderRadius: "30%",}} 
              entries={5}
              paginationLabel={[]}
              sortRows={["last_updated"]}
            />
          </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    );
  }

  
export default DatatablePage;
