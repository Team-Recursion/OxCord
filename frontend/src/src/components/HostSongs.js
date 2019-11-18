import React, { Component } from 'react'; 
import HostSongItem from './HostSongItem';

export class HostSongs extends Component {
    render() { 
        
        return this.props.songs.map((song) => (
            <HostSongItem 
                key={song.videoId} 
                song={song}                
                deleteSong={this.props.deleteSong}
            />
        ));
    }
}

export default HostSongs


