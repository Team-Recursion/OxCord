import React, { Component } from 'react'; 
import SongItem from './SongItem';
import PropTypes from 'prop-types';

export class Songs extends Component {
    render() {
        return this.props.songs.map((song) => (
            <SongItem 
                songId={song.videoId}
                songTitle={song.title}
                songDescription={song.description}
                songThumbnail={song.thumbnail}/>
        ));
    }
}

// PropTypes
Songs.propTypes = {
    songs: PropTypes.array.isRequired
}

export default Songs


