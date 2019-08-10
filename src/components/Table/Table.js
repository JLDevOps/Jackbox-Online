import React from 'react';
import { MDBDataTable, MDBCard, MDBCardBody, MDBCardHeader, MDBContainer  } from 'mdbreact';

const DatatablePage = (room_data) => {
    const data = {
      columns: [
        {
          label: 'ROOM',
          field: 'room_code',
        }, 
        {
          label: 'GAME TYPE',
          field: 'game_type',
        },
        {
          label: 'CURRENT # OF PLAYERS',
          field: 'player_amount',
        },
        {
          label: 'CURRENT # OF AUDIENCE',
          field: 'audience_amount',
        },
        {
          label: 'JOIN AS',
          field: 'join_able',

        },
        {
          label: 'LOCKED',
          field: 'locked',

        },
        {
          label: 'LAST UPDATED',
          field: 'last_updated',
          sort: 'desc',
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
          <MDBCardHeader color="purple" style={{ alignItems: "center" , textAlign: "center", fontSize: "18px", fontWeight: "700"}}><h4>ROOM SERVERS</h4></MDBCardHeader>
          <MDBCardBody>    
            <MDBDataTable
              striped
              hover
              data={data}
              responsive
              entriesOptions={[ 5, 10, 25, 50, 100 ]}
              maxHeight="100px"
              searchLabel="Room"
              theadColor="purple"
              theadTextWhite
              style={{ borderRadius: "30%",}} 
              entries={5}
              paginationLabel={[]}
            />
          </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    );
  }

  
export default DatatablePage;
