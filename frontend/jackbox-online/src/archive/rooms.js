import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

export const RoomList = props => (
    <List {...props} >
        <Datagrid rowClick="edit">
            <TextField source="room_code"/>
        </Datagrid>
    </List>
)