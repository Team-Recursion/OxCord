import React, { Component } from 'react';
import HostSongs from '../HostSongs';
import SearchBar from '../SearchBar'
import YouTube from 'react-youtube';
import io from 'socket.io-client';
import SongRequests from '../SongRequests';
import axios from 'axios';

var socket = null;

export class Room extends Component {

  state = {
      songs: [
      ],
      pin: '',
      requests: [],
      flag: false,
      playerObject: null
  }

  componentDidMount() {
    this.playerRef = React.createRef();
    socket = io('http://localhost:8080/communication')

    window.addEventListener('beforeunload', this.handleClose);
    
    //this.generatePin();
    var pin = this.props.history.location.data;
    var songs = []
    console.log('pin from history', pin);
    console.log('pin in local', localStorage.getItem('pinInLocalStorage'));

    var newRoom = false;

    if(localStorage.getItem('pinInLocalStorage') == undefined){
      console.log('pin set to history');
      pin = this.props.history.location.data;
      
      // if(pin == undefined) {
      //   this.props.history.push({
      //     pathname: '/'
      //   }); 
      // }
      
    } else {   
      if(pin == undefined){
        console.log('pin undefined and set to local value');
        pin = localStorage.getItem('pinInLocalStorage')
      } else {
        newRoom = true
        console.log('local not null and pin not undefined so set to pin');
      }
    }

    //console.log(JSON.parse(localStorage.getItem('songsInLocalStorage')));
      
    if(JSON.parse(localStorage.getItem('songsInLocalStorage')) != null && !newRoom){
      console.log('songs set to local');
      songs = JSON.parse(localStorage.getItem('songsInLocalStorage'))
    } else {
      console.log('songs set to nothing');
      localStorage.removeItem('songsInLocalStorage');
      songs = []
    }
    socket.emit('host-join-up', { pin: pin }, function(data) {
      
    });

    this.setState({ 
      pin: pin,
      songs: songs,
      currentVid: ''
    });

    localStorage.setItem('pinInLocalStorage', pin);
    //Adding socket event handlers
    socket.on('user-join-down', data => {
      //Add 1 to a count of users currently in room
      //Possibly update db value
    });

    socket.on('add-song-down', data => {
      //Add song to state array
        
      if(data.pin == this.state.pin){
          
        this.setState({ songs: [...this.state.songs, data.song] })
        localStorage.setItem('songsInLocalStorage', JSON.stringify(this.state.songs));
        }
    });
    socket.on('remove-song-down', data =>{
      if(data.pin == this.state.pin){
        this.setState({ songs: [...this.state.songs.filter(song => song.videoId !== data.videoId)] });
        localStorage.setItem('songsInLocalStorage', JSON.stringify(this.state.songs));
      }
        
    });
  }

  componentWillUnmount() {
    window.removeEventListener('onbeforeunload', this.handleClose);
    console.log("PIN in room: " + this.state.pin);
    const query = {
      data: {pin: this.state.pin}
    }
    axios.delete("http://localhost:8080/dbController/deleteRoom", query)
      .then(data => {
        console.log(data.statusCode);
      });
  }

  handleClose = (e) =>  {  
    const data = {
      pin: this.state.pin
    }

    socket.emit('delete-room', data);
  }

  addRequests = (songs) => {
    console.log('SearchPage.js: adding new songs', songs);
    this.setState({requests: []})
    songs.map((song) => (
      this.setState({ requests: [...this.state.requests, {
        videoId: song.id.videoId,
        title: song.snippet.title,
        description: song.snippet.description,
        thumbnail: song.snippet.thumbnails.default.url
      }]})
    ));
  }

  addSong = (song) => {
    var duplicate = false
    this.state.songs.map((item) => {
      if(item.videoId === song.videoId){
        duplicate = true
      }
    });

    if(duplicate){
      alert('That song is already in the queue!')
    } else {
      console.log(song);
      const newSong = {
        videoId: song.videoId,
        title: song.title,
        description: song.description,
        thumbnail: song.thumbnail
      }
      console.log('SearchPage.js: emmitting to server');
      socket.emit('add-song-up', {song: newSong, pin: this.state.pin});
      this.setState({ requests: [...this.state.requests.filter(item => item.videoId !== song.videoId)] })
    }
  }

  deleteSong = (videoId) => {
    socket.emit('remove-song-up', {videoId: videoId, pin: this.state.pin});
  }
  
  _onReady(event) {
    const player = event.target;
    player.playVideo();
    this.state.playerObject = player;
  }

  onEnd(event) {
    const player = event.target;
    if(this.state.songs.length){
      console.log('onend', this.state.songs[0].videoId);

      this.setState({currentVid: this.state.songs[0].title});
      player.cueVideoById(this.state.songs[0].videoId);
      this.deleteSong(this.state.songs[0].videoId);
      player.playVideo();
    }
  }

  checkIfRoomExists() {
    const query = {
      data: {pin: this.state.pin}
    }

    axios.get("http://localhost:8080/dbController/doesRoomExist", query)
      .then(res => {
        const exists = res.data.exists;
        if(exists){
          return true;
        }
        return false;
      })
      .catch(err => {
        console.log(err);
        return false;
      })
  }

  render() {
    const opts = {
      height: '500',
      width: '600',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    return (
      <div>
        <h1>Room #:{this.state.pin} Currently Playing: {this.state.currentVid}</h1>
          <SearchBar addRequests={this.addRequests}/>
          <p>Current Queue</p>
          <HostSongs songs={this.state.songs} deleteSong={this.deleteSong}/>
          <p>Song Requests</p>
          <SongRequests requests={this.state.requests} addSong={this.addSong}/>
          <YouTube 
            videoId={'AjWfY7SnMBI'}
            opts={opts}
            onReady={this._onReady.bind(this)}
            onEnd={this.onEnd.bind(this)}
          />
      </div>
    );
  }
}

export default Room