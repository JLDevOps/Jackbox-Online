import React, {Component} from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';

import './App.css';
import jsonServerProvider from 'ra-data-json-server';
import simpleRestProvider from 'ra-data-simple-rest'; 
import { RoomList } from './rooms';
import drfProvider from 'ra-data-drf';
import Rooms from './components/rooms';

const dataProvider = jsonServerProvider('http://localhost:8000/api/v1');
// const dataProvider = drfProvider('http://localhost:8000/api/v1'); // Localhost for now (until it can be hosted)
const App = () => (
  <Admin dataProvider={dataProvider}>
    {/* <Resource name="rooms" list={RoomList['results']} /> */}
    <Resource name="rooms" list={ListGuesser["results"]} />

  </Admin>
);

// class App extends Component {
 
//   render () {
//     return (
//       <Rooms rooms={this.state.rooms} />
//     );
//   }

//   state = {
//     rooms: []
//   };

//   componentDidMount() {
//     fetch('http://localhost:8000/api/v1/rooms/?online=Y')
//         .then(res => res.json())
//         .then((data) => {
//             //console.log(data)
//              this.setState({ rooms: data['results'] })
//         })
//         .catch(console.log)
//   }
// }

export default App;
