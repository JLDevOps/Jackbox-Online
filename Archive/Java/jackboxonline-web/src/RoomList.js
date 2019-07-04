import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class RoomList extends Component {
  state = {
    isLoading: true,
    rooms: []
  };

  async componentDidMount() {
    const response = await fetch('/api/room');
    const body = await response.json();
    this.setState({ rooms: body, isLoading: false });
  }

  render() {
    const {rooms, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-intro">
            <h2>Info List</h2>
            {rooms.map(room =>
              <div key={room.id}>
              <h1>
                {room.roomCode}
              </h1>
              <h2>
                {room.gameType}
              </h2>
              </div>
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default RoomList;