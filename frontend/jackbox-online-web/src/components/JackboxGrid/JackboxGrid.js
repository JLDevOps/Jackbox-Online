import React from 'react';
import Table from "../Table/Table";
import { JackboxFinder}  from "../JackboxFinder/JackboxFinder";

export default function JackboxGrid(room_data) {
    return (
        <div>
          <Table room_data={room_data}/>
          <JackboxFinder />
        </div>
    );
}

