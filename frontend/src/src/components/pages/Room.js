import React, { Component } from 'react';
import Songs from '../Songs';
import SearchBar from '../SearchBar'
import YouTube from 'react-youtube';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:8888/communication')

export class Room extends Component {
    state = {
        songs: [
        ]      
    }
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
        <div>
            <SearchBar addSong={this.addSong}/>
            <Songs songs={this.state.songs}/>
            <YouTube
              videoId="M7lc1UVf-VE"
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
      
      this.generatePin();
      //socket.emit('host-join-up');
      //Adding socket event handlers
      socket.on('user-join-down', data => {
        //Add 1 to a count of users currently in room
        //Possibly update db value
      });

      socket.on('add-song-down', data => {
        //Add song to state array
      });
    }

    generatePin() {
      let newPin = Math.floor(Math.random() * 9000, 10000)
      this.setState({ pin: newPin })
      socket.emit('host-join-up', { pin: newPin });
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
        //Emit socket event to room that the queue has updated (update-queue-up)
      }
    }

    onStateChange(event) {

    }
}

export default Room