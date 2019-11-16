import React, { Component } from 'react'

export class SongItem extends Component {
    
    render() {
        const {title, description, thumbnail} = this.props.song;
        return (
            <div style={songItemStyle}>
                <p>
                    <img 
                        src={thumbnail} 
                        alt= {title}
                    />
                {title}
                {description}</p>
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


export default SongItem
