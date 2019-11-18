import React, { Component } from 'react';
import HostSongs from '../HostSongs';
import SearchBar from '../SearchBar'
import YouTube from 'react-youtube';
import io from 'socket.io-client';
import SongRequests from '../SongRequests';
import { SlowBuffer } from 'buffer';
import logo from './oxImage.jpg';
import axios from 'axios';
import '../Room.css';

var socket = null;


export class Room extends Component {

  state = {
      songs: [
      ],
      pin: '',
      requests: [],
      flag: true
  }
  callAPI() {
    fetch("http://localhost:8080/testAPI")
      .then(res => res.text())
      .then(res => this.setState({apiResponse: res}))
      .catch(console.log);
  }
  componentDidMount() {
    localStorage.removeItem('songsInLocalStorage')
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
      }
      else{
          console.log('songs set to nothing');
          localStorage.removeItem('songsInLocalStorage');
          songs = []
          //localStorage.setItem('songsInLocalStorage', JSON.stringify(songs))
      }
      socket.emit('host-join-up', { pin: pin });

      this.setState({ 
        pin: pin,
        songs: songs,
        currentVid: ''
      });

      var numberPin = parseInt(pin,10);
      const query = {
        pin: numberPin
      }
      axios.post("http://localhost:8080/dbController/createRoom", query);

      localStorage.setItem('pinInLocalStorage', pin);
      //Adding socket event handlers
      socket.on('user-join-down', data => {
        //Add 1 to a count of users currently in room
        //Possibly update db value
      });

      socket.on('add-song-down', data => {
        //Add song to state array
        const player = this.state.playerObject;
        this.setState({ songs: [...this.state.songs, data.song] })
        if(this.state.flag) {
          this.setState({currentVid: this.state.songs[0].title});
          localStorage.setItem('currentVid', this.state.songs[0].title);
          player.cueVideoById(this.state.songs[0].videoId);
          this.updateQueue(this.state.songs[0].videoId);
          player.playVideo();
          this.setState({flag: false});
        }
        localStorage.setItem('songsInLocalStorage', JSON.stringify(this.state.songs));
        
    });

    socket.on('user-request-queue-down', function(data){
      console.log('user-request-queue-down');
      console.log(data.pin);

      //const currentVid = this.state.currentVid;
      
      socket.emit('host-response-queue-up', {
                                            songs: JSON.parse(localStorage.getItem('songsInLocalStorage')), 
                                            pin: localStorage.getItem('pinInLocalStorage'),
                                            currentSong: localStorage.getItem('currentVid')})
                                            
    });
  }

  componentWillUnmount() {
    window.removeEventListener('onbeforeunload', this.handleClose);
    console.log("PIN in room: " + this.state.pin);
    var numberPin = parseInt(this.state.pin);
    const query = {
      data: {pin: numberPin}
    }
    axios.delete("http://localhost:8080/dbController/deleteRoom", query)
    .then(data => {
      console.log(data.statusCode);
    });
    const data = {
      pin: this.state.pin
    }  
    socket.emit('leave-room', data);
  }

  handleClose = (e) =>  {  
    var numberPin = parseInt(this.state.pin, 10);
    const data = {
      pin: this.state.pin
    }

    socket.emit('delete-room', data);
    socket.emit('leave-room', data);
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
    this.setState({ songs: [...this.state.songs.filter(song => song.videoId !== videoId)] });
    localStorage.setItem('songsInLocalStorage', JSON.stringify(this.state.songs));
  }
  
  _onReady(event) {
    const player = event.target;
    player.playVideo();
    this.state.playerObject = player;
  }

  updateQueue = (videoId) => {
    socket.emit('update-queue-up', {videoId: videoId, pin: this.state.pin});
    this.setState({ songs: [...this.state.songs.filter(song => song.videoId !== videoId)] });
    localStorage.setItem('songsInLocalStorage', JSON.stringify(this.state.songs));
  }

  setCurrentlyPlayingToEmptyString() {
    socket.emit('no-current-song', {pin: this.state.pin});
    this.setState({
      currentVid: ""
    });
    localStorage.setItem('currentVid', '');
  }

  onEnd(event) {
    console.log('onend');
    const player = event.target;
    if(this.state.songs.length){
      this.setState({currentVid: this.state.songs[0].title});
      localStorage.setItem('currentVid', this.state.songs[0].title);
      player.cueVideoById(this.state.songs[0].videoId);
      this.updateQueue(this.state.songs[0].videoId);
      player.playVideo();
    } else {
      this.setCurrentlyPlayingToEmptyString();
      this.setState({flag: true});
    }
  }

  // checkIfRoomExists() {
  //   var numberPin = 
  //   const query = {
  //     data: {pin: this.state.pin}
  //   }

  //   axios.get("http://localhost:8080/dbController/doesRoomExist", query)
  //     .then(res => {
  //       const exists = res.data.exists;
  //       if(exists){
  //         return true;
  //       }
  //       return false;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       return false;
  //     })
  // }

  render() {
    const opts = {
      height: '600',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        rel: 0
      }
    };
    return (
      <div className="main-container">
        <header className="header">
          <h1>Room #{this.state.pin} Currently Playing: {this.state.currentVid}</h1>
        </header>
        <div className="searchBar-container">
          <SearchBar addRequests={this.addRequests}/>
        </div>
        <div className="queue-container">
          <p className = "queuePrompt">Current Queue</p>
          <HostSongs songs={this.state.songs} deleteSong={this.deleteSong}/>
        </div>
        <div className = "song-container">
          <p className = "songPrompt">Search Results</p>
          <SongRequests requests={this.state.requests} addSong={this.addSong}/>
        </div>
        <YouTube 
          className="player"
          videoId={'AjWfY7SnMBI'}
          opts={opts}
          onReady={this._onReady.bind(this)}
          onEnd={this.onEnd.bind(this)}
        />
        <div className="logo-container">
          {<img src={logo} className="logo-shape"/>}
        </div>
      </div>
    );
  }
}

export default Room