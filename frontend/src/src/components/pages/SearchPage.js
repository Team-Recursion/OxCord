//Page component to allow users to query for songs
import React, { Component } from 'react';
import io from 'socket.io-client';
import SearchBar from '../SearchBar';
import Songs from '../Songs';
import SongRequests from '../SongRequests';
import './SearchPage.css';
import Particles from 'react-particles-js';

var socket = null

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

export class SearchPage extends Component {

    constructor() {
        super();  
        this.state = {
            songs: [],
            requests: []
        }
    }
    componentDidMount() {
        socket = io('http://oxcordplayer.com/communication')
        var pin = this.props.history.location.data;
        
        var newRoom = false;

        if(localStorage.getItem('pinInLocalStorage') === undefined){
            console.log('pin set to history');
            pin = this.props.history.location.data;
        }
        else{
            if(pin === undefined){
                console.log('pin undefined and set to local value');
                pin = localStorage.getItem('pinInLocalStorage')
            }
            else{
                newRoom = true
                console.log('local not null and pin not undefined so set to pin');
            }
        }
        // if(JSON.parse(localStorage.getItem('songsInLocalStorage')) != null && !newRoom){
        //     console.log('songs set to local');
        //     songs = JSON.parse(localStorage.getItem('songsInLocalStorage'))
        // }
        // else{
        //     console.log('songs set to nothing');
        //     localStorage.removeItem('songsInLocalStorage');
        //     songs = []
        // }
        this.setState({
            pin: pin,
            songs: [],
            requests: [],
            currentVid: ''
        })
        localStorage.setItem('pinInLocalStorage', pin);
        console.log('pin in local storage', localStorage.getItem('pinInLocalStorage'));
        // console.log('songs in local storage', JSON.parse(localStorage.getItem('songsInLocalStorage')));

        
        //localStorage.removeItem('songsInLocalStorage');

        //Emit event that a user (you in this case) has joined the room
        socket.emit('user-join-up', { pin: pin});

        //Adding socket event handlers
        socket.on('user-join-down', data => {
            //Add 1 to a count of users currently in room
        });
        socket.on('add-song-down', data => {
            // console.log(localStorage.getItem('songsInLocalStorage'));
            
            //console.log(JSON.parse(localStorage.getItem('songsInLocalStorage')));
            this.setState({ songs: [...this.state.songs, data.song] })
            console.log(this.state.songs)
            //console.log(JSON.parse(JSON.stringify(localStorage.getItem('songsInLocalStorage'))));
            console.log('Song state: ' + JSON.stringify(this.state.songs))
            // localStorage.setItem('songsInLocalStorage', JSON.stringify(this.state.songs));   
            
        });
        socket.on('remove-song-down', data =>{
            console.log('request made from user at pin', data.pin);
            console.log('local pin', this.state.pin);
    
            this.setState({ songs: [...this.state.songs.filter(song => song.videoId !== data.videoId)] });
            localStorage.setItem('songsInLocalStorage', JSON.stringify(this.state.songs));
          });

        socket.on('update-queue-down', data => {
            console.log('update-queue-down hit');
            this.setState({
                currentVid: this.state.songs[0].title
            });
            this.setState({ songs: [...this.state.songs.filter(song => song.videoId !== data.videoId)] });
            localStorage.setItem('songsInLocalStorage', JSON.stringify(this.state.songs));
        });
        
        socket.on('no-current-song-down', data => {
            console.log('no-current-song-down hit');
            this.setState({currentVid: ''});
            localStorage.setItem('currentVid', '')
        })
        console.log(this.state);
        
        this.fetchSongs()
    };

    fetchSongs = () => {
        console.log('emmitting request for songs');
        console.log(localStorage.getItem('pinInLocalStorage'));

        socket.emit('user-request-queue-up', {pin: localStorage.getItem('pinInLocalStorage')});

        socket.on('host-response-queue-down', (data) => {
            console.log('song info received');
            if(data.songs) {
                this.setState({songs: data.songs})
                this.setState({currentVid: data.currentSong});
                localStorage.setItem('songsInLocalStorage', JSON.stringify(data.songs))
            } else {
                this.setState({currentVid: ""});
            }
        });
    }

    //Method to add song to host room
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
            this.setState({ requests: [...this.state.requests.filter(item => item.videoId !== song.videoId)] });
        }
      }
  
      deleteSong = (videoId) => {
          this.setState({ songs: [...this.state.songs.filter(song => song.videoId !== videoId)] });
      }

    handleGo(e) {
        socket.emit('test', {pin: this.state.pin});
    }

    render() {
        return (
            <div className ="main-container">
                <Particles className="particles"
                    params={particleOpt}
                />
                <div className="search-header">
                    <div className="room-info">
                        Room#: {this.state.pin} <br/> Currently Playing: {this.state.currentVid}
                    </div>
                </div>
                <div className="searchBar-container">
                    <SearchBar addRequests={this.addRequests}/>
                </div>
                <div className="queue-container2">
                    <div className = "queue-prompt">Current Queue</div>
                    <div className="queue-bounding2">
                        <Songs songs={this.state.songs}/>
                    </div>
                </div>
                <div className="song-container2">
                    <div className = "song-prompt">Search Results</div>
                    <div className="song-bounding2">
                    <SongRequests requests={this.state.requests} addSong={this.addSong}/>
                    </div>
                </div>
            <div>
            </div> 
                {/* <button onClick={this.handleGo} className='btn-enter' >Enter</button> */}
            </div>
        )
    }
}

export default SearchPage;



    