import React, { Component } from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import JackboxGrid from './components/JackboxGrid/JackboxGrid';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { purple } from '@material-ui/core/colors/purple';
// import Theme from './components/Theme/Theme';

// const theme = createMuiTheme({
//   palette: {
//     primary: purple
//   },
//   MuiAppBar: {
//     primary: purple
//   }
// });

class App extends Component {

  render() {
    return (
      // <MuiThemeProvider theme={theme}>
      <div styles="flexGrow: 1">
        <Header/>
        <JackboxGrid room_data={this.state.room_data}/>
      </div>

      // </MuiThemeProvider>)
    )
  }

  state = {
    room_data: []
  };

  async componentDidMount() {
      try {
        setInterval(async () => {
          const res = await fetch('http://localhost:8000/api/v1/rooms/?online=Y');
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
      // fetch('http://localhost:8000/api/v1/rooms/?online=Y')
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
