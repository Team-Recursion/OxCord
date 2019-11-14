import React, { Component } from 'react'
import { Route } from 'react-router-dom'

export class JoinRoom extends Component {
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
        style={buttonStyle}
        onClick={() => { history.push('/', Math.floor(Math.random() * 9000, 10000)) }}
      >
        JoinRoom
      </button>
    )} />
  )

const buttonStyle = {
    display: 'inline-block',
    borderColor: '#555',
    background: '#555',
    color: '#fff',
    paadding: '7px 20px',
    cursor: 'pointer'
}

export default JoinRoom
