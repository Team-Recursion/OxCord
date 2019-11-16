//Page component to allow users to query for songs
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import io from 'socket.io-client';
import SearchBar from '../SearchBar';
import Songs from '../Songs';

var socket = null

// const [songs, setSongs] = React.useState(
//     localStorage.getItem('songsInLocalStorage') || []
//   );

//   React.useEffect(() => {
//     localStorage.setItem('songsInLocalStorage', songs); 
//   }, [songs]);

export class SearchPage extends Component {

    constructor() {
        super();
        
        this.state = {
            songs: [],
            requests: []
        }
        this.handleGo = this.handleGo.bind(this)
    }
    componentDidMount() {
        
        socket = io('http://localhost:8080/communication')
        var pin = this.props.history.location.data;
        var songs = [];

        // console.log('local pin:', localStorage.getItem('pinInLocalStorage'));
        // console.log(localStorage.getItem('pinInLocalStorage') == 'undefined');
        
        // console.log('pin history value:', pin);
        // console.log(pin == undefined);
        // console.log(pin != undefined);
        
        
        
        console.log(pin == localStorage.getItem('pinInLocalStorage'));
        
        if(localStorage.getItem('pinInLocalStorage') == 'undefined'){
            console.log('pin set to history');
            pin = this.props.history.location.data;
        }
        else{
            console.log(pin === undefined);
            console.log(pin);
            
            
            if(pin == undefined){
                console.log('pin undefined and set to local value');
                
                pin = localStorage.getItem('pinInLocalStorage')
            }
            else{
                console.log('local not null and pin not undefined so set to pin');
                pin = pin
                
            }
        }

        // console.log('type of local songs', typeof(localStorage.getItem('songsInLocalStorage')));
        // console.log(JSON.parse(localStorage.getItem('songsInLocalStorage')));
        
        // if(localStorage.getItem('songsInLocalStorage') !== 'undefined'){
        //     songs = localStorage.getItem('songsInLocalStorage')
        // }
        // else{
        //     songs = [];
        // }

        this.setState({
            pin: pin,
            songs: []
        })
        localStorage.setItem('pinInLocalStorage', pin);
        console.log('pin in local storage', localStorage.getItem('pinInLocalStorage'));
        console.log(JSON.parse(localStorage.getItem('songsInLocalStorage')));
        
        //Emit event that a user (you in this case) has joined the room
        socket.emit('user-join-up', { pin: pin});

        //Adding socket event handlers
        socket.on('user-join-down', data => {
            //Add 1 to a count of users currently in room
        });
    
        socket.on('add-song-down', data => {
            //Add song to state array
            console.log('request made by host at pin', data.pin);
            console.log('local pin', this.state.pin);
            console.log(localStorage.getItem('songsInLocalStorage'));
            
            //console.log(JSON.parse(localStorage.getItem('songsInLocalStorage')));
            
            
            if(data.pin == this.state.pin){
                console.log('adding request from host');

                this.setState({ songs: [...this.state.songs, data.song] })
                console.log(this.state.songs)
                //console.log(JSON.parse(JSON.stringify(localStorage.getItem('songsInLocalStorage'))));
                console.log('Song state: ' + JSON.stringify(this.state.songs))
                localStorage.setItem('songsInLocalStorage', JSON.stringify(this.state.songs));
                
            }
        });
        socket.on('remove-song-down', data =>{
            console.log('request made from user at pin', data.pin);
            console.log('local pin', this.state.pin);
    
            if(data.pin == this.state.pin){
              this.setState({ songs: [...this.state.songs.filter(song => song.videoId !== data.videoId)] });
            }
            
          });

        socket.on('update-queue-down', data => {
            //Update SearchRoom's queue
        });
        socket.on('test', data => {
            alert("test");
          })
    };

    
    //Method to add song to host room
    addSong = (song) => {
        console.log('SearchPage.js: adding new song', song);
        const newSong = {
          videoId: song.videoId,
          title: song.title,
          description: song.description,
          thumbnail: song.thumbnail
        }
        console.log('SearchPage.js: emmitting to server');
        socket.emit('add-song-up', {song: song, pin: this.state.pin});
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
                <SearchBar addSong={this.addSong}/>
                <Songs songs={this.state.songs}/>
            <div>
            </div> 
                {/* <button onClick={this.handleGo} className='btn-enter' >Enter</button> */}
            </div>
        )
    }
}

export default SearchPage;



    