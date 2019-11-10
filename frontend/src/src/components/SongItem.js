import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class SongItem extends Component {
    render() {
        return (
            <div style={songItemStyle}>
                <h2>song was queued correctly. display needs to be fixed</h2>
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
