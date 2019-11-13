//Page component to allow users to query for songs
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:8888/communication')

export class SearchPage extends Component {

    constructor() {
        super();
        this.state = {
            pin: ''
        }
        this.handleGo = this.handleGo.bind(this)
    }
    componentDidMount() {
        const pin = this.props.history.location.data;
        this.setState({
            pin: pin
        })
        //Emit event that a user (you in this case) has joined the room
        socket.emit('user-join-up', { pin: pin});

        //Adding socket event handlers
        socket.on('user-join-down', data => {
            //Add 1 to a count of users currently in room
        });
    
        socket.on('add-song-down', data => {
            //Add song to state array
        });

        socket.on('update-queue-down', data => {
            //Update SearchRoom's queue
        });

        socket.on('test', data => {
            alert("test");
          })
    };

    //Method to add song to host room
    addSong() {
        //Emit socket event to room with a song request.
    }

    handleGo(e) {
        socket.emit('test', {pin: this.state.pin});
    }

    render() {
        return (
            <div className='component-container' >
            <div>
                </div> 
                {
                    <h1>hello</h1>
                }
                <button onClick={this.handleGo} className='btn-enter' >Enter</button>

            </div>
        )
    }
}

export default SearchPage;



    