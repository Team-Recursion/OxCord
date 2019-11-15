import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './Room.css';

export class CreateRoom extends Component {
    
    render() {
        return (
            <div>
              <Button />
            </div>
        )
    }
}

const Button = () => (
    <Route render={({ history}) => (
      <button
        type='button'
        className='button'
        style={buttonStyle}
        onClick={() => { history.push('/room') }}
      >
        <span>Create Room</span>
      </button>
    )} />
  )


const buttonStyle = {
    display: 'inline-block',
    borderColor: '#555',
    // background: '#555',
    // color: '#fff',
    paadding: '7px 20px',
    cursor: 'pointer'
}

export default CreateRoom
