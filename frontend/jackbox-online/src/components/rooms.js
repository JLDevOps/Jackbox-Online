import React from 'react'

const Rooms = ({rooms}) => {
    console.log(rooms);
    return (
        <div>
            <center><h1>Room List</h1></center>
            {rooms.map((room) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{room.room_code}</h5>
                        {/* <h6 class="card-subtitle mb-2 text-muted">{contact.email}</h6>
                        <p class="card-text">{contact.company.catchPhrase}</p> */}
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Rooms