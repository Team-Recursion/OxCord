import React, { Component } from 'react'

export class CreateRoom extends Component {
    render() {
        return (
            <form>
                <input
                  type="submit"
                  value="Create Room"
                  className="createBtn"
                  style={buttonStyle}
                />
            </form>
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

export default CreateRoom
