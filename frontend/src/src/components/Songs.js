import React, { Component } from 'react'; 
import SongItem from './SongItem';

export class Songs extends Component {
    render() { 
        
        return this.props.songs.map((song) => (
            <SongItem 
                key={song.videoId} 
                song={song}                
                addSong={this.props.addSong}
            />
        ));
    }
}

export default Songs


