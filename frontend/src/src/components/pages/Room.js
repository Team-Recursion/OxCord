import React, { Component } from 'react';
import HostSongs from '../HostSongs';
import SearchBar from '../SearchBar'
import YouTube from 'react-youtube';
import io from 'socket.io-client';
import SongRequests from '../SongRequests';
import { SlowBuffer } from 'buffer';

var socket = null;

export class Room extends Component {
    state = {
        songs: [
        ],
        pin: '',
        requests: []
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
            <h1>Room #:{this.state.pin} Currently Playing: {this.state.currentVid}</h1>
            <SearchBar addRequests={this.addRequests}/>
            <p>Current Queue</p>
            <HostSongs songs={this.state.songs} deleteSong={this.deleteSong}/>
            <p>Song Requests</p>
            <SongRequests requests={this.state.requests} addSong={this.addSong}/>
            <YouTube
              videoId={'M7lc1UVf-VE'}
              opts={opts}
              onReady={this._onReady.bind(this)}
              onStateChange={this.onStateChange.bind(this)}
              onEnd={this.onEnd.bind(this)}
            />
        </div>
      );
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
        }] })
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
      }
      else{
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

    callAPI() {
      fetch("http://localhost:8080/testAPI")
        .then(res => res.text())
        .then(res => this.setState({apiResponse: res}))
        .catch(console.log);
    }
    componentDidMount() {
      localStorage.removeItem('songsInLocalStorage')
      socket = io('http://localhost:8080/communication')
      //this.generatePin();
      var pin = this.props.history.location.data;
      var songs = []
      console.log('pin from history', pin);
      console.log('pin in local', localStorage.getItem('pinInLocalStorage'));
      
      
      var newRoom = false;

      if(localStorage.getItem('pinInLocalStorage') == 'undefined'){
          console.log('pin set to history');
          pin = this.props.history.location.data;
      }
      else{
          // console.log(pin === undefined);
          // console.log(pin);
          
          
          if(pin == undefined){
              console.log('pin undefined and set to local value');
              pin = localStorage.getItem('pinInLocalStorage')
          }
          else{
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
      socket.on('user-request-queue-down', function(data){
        console.log('user-request-queue-down');
        console.log(data.pin);
        
        socket.emit('host-response-queue-up', {
                                              songs: JSON.parse(localStorage.getItem('songsInLocalStorage')), 
                                              pin: localStorage.getItem('pinInLocalStorage')})
      });

      socket.on('test', data => {
        alert("test");
      })
    }
    _onReady(event) {
      // access to player in all event handlers via event.target
    
      event.target.playVideo();
      const player = event.target;
    }

    onEnd(event) {
      const player = event.target;
      if(this.state.songs.length){
        console.log('onend', this.state.songs[0].videoId);
        this.setState({currentVid: this.state.songs[0].title});
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