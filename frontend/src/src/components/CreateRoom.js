import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios';
import './RoomButton.css';

export class CreateRoom extends Component {

    render() {
        return (
            <div>
              <Route render={({ history}) => (
                <button
                  // type='button'
                  className='button'
                  style={buttonStyle}
                  onClick={() => { 
                    let newPin = Math.floor(Math.random() * 9000, 10000)
                    this.setState({ pin: newPin })
                    
                    //let stringPin = parseInt(newPin, 10);
                    const query = {
                      pin: newPin
                    }
                    axios.post("http://172.31.8.152:8080/dbController/createRoom", query);
                    localStorage.clear();
          
                    let path = '/room';
                    history.push({
                        pathname: path,
                        data: newPin
                    }
                    ) 
                  }}
                >
                  <span>Create Room</span>
                </button>
              )} />
            </div>
        )
    }
}

const buttonStyle = {
    display: 'inline-block',
    borderColor: '#555',
    // background: '#555',
    // color: '#fff',
    paadding: '7px 20px',
    cursor: 'pointer'
}

export default CreateRoom
