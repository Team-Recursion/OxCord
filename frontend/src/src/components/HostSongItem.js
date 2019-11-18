import React, { Component } from 'react'
import './ItemDesign.css';

export class HostSongItem extends Component {
    
    render() {
        const {videoId, title, description, thumbnail} = this.props.song;
        return (
            <div className="box-container">
                <div className="thumbnail-container">
                    <img 
                    className="thumbnail"
                        src={thumbnail} 
                        alt= {title}
                    />
                </div>
                <div className="title-container">
                    <p className="title-info">
                        {title}
                    </p>
                    <p>
                        <button onClick={this.props.deleteSong.bind(this, videoId)} className="removeButton">X</button>
                    </p>
                </div>
            </div>
        )
    }
}


export default HostSongItem
