import React, { Component } from 'react'
import Song from '../Song';
export class Room extends Component {
    state = {
        songs: [
            {
                id: 1,
                title: 'song title 1',
            },
            {
                id: 2,
                title: 'song title 2',
            },
            {
                id: 3,
                title: 'song title 3',
            },
        ]      
    }
    render() {
        return (
            <form style={{display: 'flex'}}>
                <input
                    type="text"
                    name="title"
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Enter Song"
                />
                <input
                    type="submit"
                    name="title"
                    placeholder="Search"
                    style={buttonStyle}
                />
            </form>
        )
    }
}

const buttonStyle = {
    display: 'inline-block',
    borderColor: '#555',
    background: '#555',
    color: '#fff',
    paadding: '7px 20px',
    cursor: 'pointer'
}



const left = {

}
export default Room
