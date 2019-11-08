import React, { Component } from 'react';
import Songs from '../Songs';
import SearchBar from '../SearchBar'

export class Room extends Component {
    state = {
        songs: [
            {
                id: 1,
                title: 'song 1'
            },
            {
                id: 2,
                title: 'song 2'
            },
            {
                id: 3,
                title: 'song 3'
            }
        ]
    }

    render() {
        return (
            <div>
                <SearchBar />
                <Songs songs={this.state.songs}/>
            </div>
        )
    }
}


export default Room
