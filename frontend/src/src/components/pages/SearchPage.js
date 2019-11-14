//Page component to allow users to query for songs
import React, { Component } from 'react';
import io from 'socket.io-client';

export class SearchPage extends Component {
    componentDidMount() {
        this.socket = io('/');    

        //TODO: Emit event that a user (you in this case) has joined the room

        //Adding socket event handlers
        this.socket.on('user-join-down', data => {
            //Add 1 to a count of users currently in room
        });
    
        this.socket.on('add-song-down', data => {
            //Add song to state array
        });

        this.socket.on('update-queue-down', data => {
            //Update SearchRoom's queue
        });
    };

    //Method to add song to host room
    addSong() {
        //Emit socket event to room with a song request.
    }
}



    