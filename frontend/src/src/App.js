import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, {Component} from 'react';
import ReactPlayer from 'react-player';
import YouTube from 'react-youtube';
import axios from 'axios';
import Particles from 'react-particles-js';
import logo from './randomLogo.png';

import './App.css';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import Room from './components/pages/Room';

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
              <div class ="text">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Welcome to OxCord, the world's first Video Player Sharer!
                </p>
                <a
                  className="App-link"
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
                <h1>Join the Party!</h1>
                <CreateRoom/>
                <JoinRoom/>
              </div>
              </header>
          </div>
        )} />
        <Route path="/room" component={Room} />
      </div>
    </Router>
    
  );

// class App extends Component {

//   render() {
    
//     const opts = {
//       height: '500',
//       width: '600',
//       playerVars: { // https://developers.google.com/youtube/player_parameters
//         autoplay: 1,
//         enablejsapi: 1,
//         // playlist: "qpbooQFvXZs, epHZWUEsU5o",
//         autohide:1
//       }
//     };

//     return (
      
//       <div
//         style={{
//           position: 'absolute', left: '50%', top: '50%',
//           transform: 'translate(-50%, -50%)'
//         }}
//         >
//         <YouTube
//           videoId="M7lc1UVf-VE"
//           opts={opts}
//           onReady={this._onReady.bind(this)}
//           onStateChange={this.onStateChange.bind(this)}
//           onEnd={this.onEnd.bind(this)}
          
//         />
//         <p className = "App-intro">{this.state.apiResponse}</p>
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             Name:
//             <input type="text" name="textBox" value={this.state.value} onChange={this.handleChange} />
//           </label>
//             <input type="submit" value="Submit" />
//         </form>
//       </div>
//     );
//   }

//   constructor(props) {
//     super(props);
//     this.state = { 
//       value: "",
//       songs: [
        
//       ],
//       id: "_nBlN9yp9R8"
//    };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleSubmit(event) {
//     //alert('A name was submitted: ' + this.state.value);
//     var string = this.state.value;
//     const query = {
//       "value":string
//     };
//     this.setState({value:''});
//     axios.post('http://localhost:8888/searchController/search', query)
//       .then((data) => {
//         console.log(data);
        
//         this.setState({id: data.data})
//       })
//       .catch(err => {
//         console.error(err);
//       })
//     event.preventDefault();
//     //player.cueVideoById("https://www.youtube.com/watch?v=YEJBmmqXUQs");
//   }
  
//   handleChange(event) {
//     this.setState({value: event.target.value});
//   }

//   callAPI() {
//     fetch("http://localhost:8888/testAPI")
//           .then(res => res.text())
//           .then(res => this.setState({apiResponse: res}))
//           .catch(console.log);
//   }

//   componentDidMount() {
//     this.callAPI();
//   }

//   _onReady(event) {
//     // access to player in all event handlers via event.target
//     console.log('onready', this.state.id);
    
//     event.target.playVideo();
//     const player = event.target;
//   }

//   onEnd(event) {
//     const player = event.target;
//     console.log('onend', this.state.id);
//     player.cueVideoById(this.state.id);
//     player.playVideo();
//   }

//   onStateChange(event) {
//     const player = event.target;
//   }
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
