import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import Room from './components/pages/Room';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" render={props => (
          <React.Fragment>
            <h1>Auxtail</h1>
            <p1>etc etc etc taliking about the team and project</p1>
            {/* <ul>
              <li>Jason Yeh</li>
              <li>Jesse Alcocer</li>
              <li>Peter Trinh</li>
              <li>Joseph Tuazon</li>
            </ul> */}
            <CreateRoom/>
            <JoinRoom/>
          </React.Fragment>
        )} />
        <Route path="/room" component={Room} />
      </div>
    </Router>
  );
}

export default App;
