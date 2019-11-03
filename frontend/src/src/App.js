import React, {Component} from 'react';
import ReactPlayer from 'react-player';
//import logo from './logo.svg';
import './App.css';
import './script.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:8888/testAPI")
          .then(res => res.text())
          .then(res => this.setState({apiResponse: res}))
          .catch(console.log);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className = "App">
          <header className = "App-header">
              <h1 className ="App-title">Welcome to OxCord</h1>
              <ReactPlayer url="https://www.youtube.com/watch?v=YEJBmmqXUQs" playing />
          </header>
          <p className = "App-intro">{this.state.apiResponse}</p>
      </div>
    )
  }
}



export default App;
