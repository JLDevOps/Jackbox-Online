import React, { Component } from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import JackboxGrid from './components/JackboxGrid/JackboxGrid';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

class App extends Component {

  render() {
    return (
      <div>
        <Header/>
        <JackboxGrid room_data={this.state.room_data} />
      </div>
    )
  }

  state = {
    room_data: []
  };

  async componentDidMount() {
      try {
        setInterval(async () => {
          const res = await fetch('http://localhost:8000/api/v1/rooms/?online=Y&ordering=-last_updated');
          const blocks = await res.json();
          console.log(blocks['results']);
          
          this.setState(
            { 
              isLoading: true,
              room_data: blocks['results']
            }
          )

        }, 3000);
      } catch (e) {
        console.log(e)
      }
      // fetch('http://localhost:8000/api/v1/rooms/?online=Y&ordering=-last_updated')
      //     .then(res => res.json())
      //     .then((data) => {
      //         this.setState(
      //           { 
      //             isLoading: true,
      //             room_data: data['results']
      //           }
      //         )
      //     })
      //     .catch(console.log)
  }
}

export default App;
