import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class SongItem extends Component {
    render() {
        return (
            <div style={songItemStyle}>
                <p1>
                    <img 
                        src={this.props.songThumbnail} 
                        alt= {this.props.songTitle}
                    />
                {this.props.songTitle}
                {this.props.songDescription}</p1>
            </div>
        )
    }
}

const songItemStyle = {
    background: '#f4f4f4',
    padding: '10px',
    borderBottom: '1px #ccc dotted',
    textDecoration: 'none'
}


SongItem.propTypes = {
    song: PropTypes.object.isRequired
}

export default SongItem
