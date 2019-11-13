
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, {Component} from 'react';

import './App.css';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import Room from './components/pages/Room';
import JoinPage from './components/pages/JoinPage';
import SearchPage  from './components/pages/SearchPage';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" render={props => (
          <React.Fragment>
            <h1>Auxtail</h1>
            <p1>etc etc etc talking about the team and project</p1>
            <CreateRoom/>
            <JoinRoom/>
          </React.Fragment>
        )} />
        <Route path="/room" component={Room} />
        <Route path="/joinPage" component={JoinPage}/>
        <Route path="/searchPage" component={SearchPage}/>
      </div>
    </Router>
  );
}

export default App;
