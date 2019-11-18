import React, { Component } from 'react'

export class SongRequestItem extends Component {
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
                <button onClick={this.props.addSong.bind(this, this.props.song)} style={buttonStyle}>+</button>
                </p>
            </div>
        )
    }
}

const buttonStyle = {
    background: '#00ff00',
    color: '#fff',
    border: 'none',
    padding: '5px 8px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}

const songItemStyle = {
    background: '#f4f4f4',
    padding: '10px',
    borderBottom: '1px #ccc dotted',
    textDecoration: 'none'
}


// SongItem.propTypes = {
//     song: PropTypes.object.isRequired
// }

export default SongRequestItem
