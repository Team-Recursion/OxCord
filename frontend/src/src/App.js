import React, {Component} from 'react';
import ReactPlayer from 'react-player';
import YouTube from 'react-youtube';
import axios from 'axios';
//import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    
    const opts = {
      height: '500',
      width: '600',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        enablejsapi: 1,
        // playlist: "qpbooQFvXZs, epHZWUEsU5o",
        autohide:1
      }
    };

    return (
      
      <div
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        >
        <YouTube
          videoId="M7lc1UVf-VE"
          opts={opts}
          onReady={this._onReady}
          onStateChange={this.onStateChange}
          onEnd={this.onEnd}
          
        />
        <p className = "App-intro">{this.state.apiResponse}</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="textBox" value={this.state.value} onChange={this.handleChange} />
          </label>
            <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    var string = this.state.value;
    const query = {
      "value":string
    };
    this.setState({value:''});
    axios.post('http://localhost:8888/searchController/search', query)
      .then((data) => console.log(data.data))
      .catch(err => {
        console.error(err);
      })
    event.preventDefault();
    //player.cueVideoById("https://www.youtube.com/watch?v=YEJBmmqXUQs");
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
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

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.playVideo();
    const player = event.target;
  }

  onEnd(event) {
    const player = event.target;
    player.cueVideoById("_nBlN9yp9R8");
    player.playVideo();
  }

  onStateChange(event) {
    const player = event.target;
  }

  // render() {
  //   return (
  //     <div className = "App">
  //         <header className = "App-header">
  //             <h1 className ="App-title">Welcome to OxCord</h1>
  //             <ReactPlayer url="https://www.youtube.com/watch?v=YEJBmmqXUQs" playing />
  //         </header>
  //         <p className = "App-intro">{this.state.apiResponse}</p>
  //     </div>
  //   )
  // }
}



export default App;
