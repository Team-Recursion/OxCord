import React, { Component } from 'react'
import './ItemDesign.css';

export class SongRequestItem extends Component {
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
                    <p>
                        <button onClick={this.props.addSong.bind(this, this.props.song)} className="addButton">+</button>
                    </p>
                </div>
            </div>
        )
    }
}


// SongItem.propTypes = {
//     song: PropTypes.object.isRequired
// }

export default SongRequestItem
