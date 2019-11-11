
import React, { Component } from 'react';
import Songs from '../Songs';
import SearchBar from '../SearchBar'
import YouTube from 'react-youtube';
import io from 'socket.io-client';
import axios from 'axios';
export class Room extends Component {
    state = {
        songs: [
        ]      
    }
    render() {
      const opts = {
        height: '600',
        width: '600',
        playerVars: { // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          enablejsapi: 1,
          // playlist: "qpbooQFvXZs, epHZWUEsU5o",
          autohide:1
        }
      };
      return (
        <div>
            <SearchBar addSong={this.addSong}/>
            <Songs songs={this.state.songs}/>
            <YouTube
              videoId="is38pqgbj6A"
              opts={opts}
              onReady={this._onReady.bind(this)}
              onStateChange={this.onStateChange.bind(this)}
              onEnd={this.onEnd.bind(this)}
            />
            {/* <p className = "App-intro">{this.state.apiResponse}</p>
            <form onSubmit={this.handleSubmit}>
              <label>
                Name:
                <input type="text" name="textBox" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form> */}
        </div>
      );
    }
    constructor(props) {
      super(props);
        // this.state = { 
        //   songs: [
        //   ],
        // };

    }

    // handleSubmit(event) {
    //   //alert('A name was submitted: ' + this.state.value);
    //   var string = this.state.value;
    //   const query = {
    //     "value":string
    //   };
    //   this.setState({value:''});
    //   axios.post('http://localhost:8888/searchController/search', query)
    //     .then((data) => {
    //       console.log(data.data);
    //       this.setState({id: data.data})
    //     })
    //     .catch(err => {
    //       console.error(err);
    //     })
    //       event.preventDefault();
    //       //player.cueVideoById("https://www.youtube.com/watch?v=YEJBmmqXUQs");
    // }
  
    // handleChange(event) {
    //   this.setState({value: event.target.value});
    // }

    addSong = (song) => {
      console.log('adding new song', song);
      const newSong = {
        videoId: song.videoId,
        title: song.title,
        description: song.description,
        thumbnail: song.thumbnail
      }
      this.setState({ songs: [...this.state.songs, newSong] });
    }

    deleteSong = (videoId) => {
        this.setState({ songs: [...this.state.songs.filter(song => song.videoId !== videoId)] });
    }

    callAPI() {
      fetch("http://localhost:8888/testAPI")
        .then(res => res.text())
        .then(res => this.setState({apiResponse: res}))
        .catch(console.log);
    }

    componentDidMount() {
      this.socket = io('/');
      this.generatePin();
      this.socket.on('room-joined', data => {
        //add user to room
      })

      this.socket.on('add-song', data => {
        //pass song to backend
      })
    }

    generatePin() {
      let newPin = Math.floor(Math.random() * 9000, 10000)
      this.setState({ pin: newPin })
      this.socket.emit('host-join', { pin: newPin });
    }

    _onReady(event) {
      // access to player in all event handlers via event.target
      console.log('onready');
    
      event.target.playVideo();
      const player = event.target;
    }

    onEnd(event) {
      const player = event.target;
      if(this.state.songs.length){
        console.log('onend', this.state.songs[0].videoId);
        player.cueVideoById(this.state.songs[0].videoId);
        this.deleteSong(this.state.songs[0].videoId);
        player.playVideo();
      }
    }

    onStateChange(event) {
      const player = event.target;
    }
}

export default Room
