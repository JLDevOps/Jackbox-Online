import React, { Component } from 'react';
import Home from './Components/Home';
import CommitList from './Components/Commit/CommitList';
import { Route, Router, Switch } from './Utils/Routing';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/commit" component={CommitList} />
        </Switch>
      </Router>
    );
  }
}

export default App;
