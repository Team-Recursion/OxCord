import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import Particles from 'react-particles-js';
import logo from './OxCordLogoFinal.png';

import './App.css';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import Room from './components/pages/Room';
import JoinPage from './components/pages/JoinPage';
import SearchPage  from './components/pages/SearchPage';

const particleOpt = {
  particles:{
    number:{
      value: 150,
      density: {
        enable: true,
        value_area: 800,
      }
    }
  }
}

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" render={props => (
          <div className="App">
            <Particles className="particles"
              params={particleOpt}
            />
            <header className="App-header">
              <div className ="text">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Welcome to OxCord, the world's first Video Player Sharer!
                </p>
                <h1>Join the Party!</h1>
                <CreateRoom/>
                <JoinRoom/>
              </div>
              </header>
          </div>
        )} />
        <Route path="/room" component={Room} />
        <Route path="/joinPage" component={JoinPage}/>
        <Route path="/searchPage" component={SearchPage}/>
      </div>
    </Router>
    
  );
}

export default App;
