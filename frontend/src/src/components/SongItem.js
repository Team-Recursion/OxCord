import React, { Component } from 'react'
import './ItemDesign.css';

export class SongItem extends Component {
    
    render() {
        const {title, description, thumbnail} = this.props.song;
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
                </div>
            </div>
        )
    }
}

export default SongItem
