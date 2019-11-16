import React, { Component } from 'react'; 
import SongRequestItem from './SongRequestItem';

export class SongRequests extends Component {
    render() {         
        return this.props.requests.map((song) => (
            <SongRequestItem
                key={song.videoId} 
                song={song}                
                addSong={this.props.addSong}
                />
        ));
    }
}

// PropTypes
// Songs.propTypes = {
//     songs: PropTypes.array.isRequired
// }

export default SongRequests


