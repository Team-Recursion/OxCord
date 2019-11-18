import React, { Component } from 'react'

export class HostSongItem extends Component {
    
    render() {
        const {videoId, title, description, thumbnail} = this.props.song;
        return (
            <div style={songItemStyle}>
                <p>
                    <img 
                        src={thumbnail} 
                        alt= {title}
                    />
                {title}
                <button onClick={this.props.deleteSong.bind(this, videoId)} style={buttonStyle}>X</button>
                </p>
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
const buttonStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 8px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}


export default HostSongItem
