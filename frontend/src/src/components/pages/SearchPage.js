//Page component to allow users to query for songs
import React, { Component } from 'react';
import io from 'socket.io-client';
import SearchBar from '../SearchBar';
import Songs from '../Songs';
import SongRequests from '../SongRequests';

var socket = null

export class SearchPage extends Component {

    constructor() {
        super();  
        this.state = {
            songs: [],
            requests: [],
            pin: 'defaultPin',
            currentVid: 'defaultVid'
        }
    }
    componentDidMount() {
        socket = io('http://localhost:8080/communication')
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
                //console.log(this.state.songs)
                //console.log(JSON.parse(JSON.stringify(localStorage.getItem('songsInLocalStorage'))));
                //console.log('Song state: ' + JSON.stringify(this.state.songs))
                // localStorage.setItem('songsInLocalStorage', JSON.stringify(this.state.songs));   
        });
        socket.on('remove-song-down', data =>{
            //console.log('request made from user at pin', data.pin);
            //console.log('local pin', this.state.pin);
    
              this.setState({ songs: [...this.state.songs.filter(song => song.videoId !== data.videoId)] });
            //   localStorage.setItem('songsInLocalStorage', JSON.stringify(this.state.songs));
            
          });

        socket.on('update-queue-down', data => {
            //Update SearchRoom's queue
        });
        socket.on('test', data => {
            alert("test");
          })
        console.log('state for searchpage', this.state);
        
        this.fetchSongs()
    };

    fetchSongs = () => {
        console.log('emmitting request for songs from', localStorage.getItem('pinInLocalStorage'));
        console.log(this.state.pin);

        socket.emit('user-request-queue-up', {pin: localStorage.getItem('pinInLocalStorage')});

        socket.on('host-response-queue-down', function(data){
            console.log('song info received');
            console.log(data);
            this.setState({pin: data.pin})
            console.log(this.state.pin);
            
            //localStorage.setItem('songsInLocalStorage', JSON.stringify(data.songs))
        });
    }

    //Method to add song to host room
    addRequests = (songs) => {
        //console.log('SearchPage.js: adding new songs', songs);
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
            //console.log(song);
            const newSong = {
                videoId: song.videoId,
                title: song.title,
                description: song.description,
                thumbnail: song.thumbnail
            }
            //console.log('SearchPage.js: emmitting to server');
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
            <div className='component-container' >
    <h1>Room #:{this.state.pin} Currently Playing: {this.state.currentVid}</h1>
                <SearchBar addRequests={this.addRequests}/>
                <p>Current Queue</p>
                    <Songs songs={this.state.songs}/>
                <p>Search Results</p>
                <SongRequests requests={this.state.requests} addSong={this.addSong}/>
            <div>
            </div> 
                {/* <button onClick={this.handleGo} className='btn-enter' >Enter</button> */}
            </div>
        )
    }
}

export default SearchPage;



    