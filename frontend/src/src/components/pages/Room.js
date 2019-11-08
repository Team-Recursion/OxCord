import React, { Component } from 'react'

export class Room extends Component {
    render() {
        return (
            <div>
            <form style={{display: 'flex'}}>
                <input
                    type="text"
                    name="title"
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Enter Song Request"
                />
                <input
                    type="submit"
                    name="title"
                    placeholder="Search"
                    style={buttonStyle}
                />
            </form>
            </div>
        )
    }
}

const buttonStyle = {
    display: 'inline-block',
    borderColor: '#555',
    background: '#555',
    color: '#fff',
    paadding: '7px 20px',
    cursor: 'pointer'
}

export default Room
