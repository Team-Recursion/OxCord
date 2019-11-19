import React, { Component } from 'react';
import axios from 'axios';
import './JoinPage.css';
import '../RoomButton.css';
import Particles from 'react-particles-js';

const particleOpt = {
    particles:{
      number:{
        value: 150,
        density: {
          enable: true,
          value_area: 800,
        }
      }
    }
  }

export class JoinPage extends Component {

    constructor() {
        super();
        this.state = {
            pin: '',
        }
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange = async (e) => {
        e.preventDefault();
        const query = {
            params: {pin: this.state.pin}
        }
      
        let result = await axios.get("http://oxcordplayer.com/dbController/doesRoomExist", query);
        let exists = result.data.exists;

        console.log(exists);

        if(exists === true) {
            console.log("If hit");
            let path = `/searchPage`;
            this.props.history.push({
                pathname: path,
                data: this.state.pin
            });
        } else {
            console.log("Else hit");
            alert("This room does not exist");
        }  
    };

    handleChange = (event) => {
        this.setState({pin: event.target.value});
    }

    handleSubmit = (event) => {
        let path = `/searchPage`;
        this.props.history.push({
            pathname: path,
            data: this.state.pin
        });
    }

    render() {
        return (
            <div className='component-container' >
                <Particles className="particles"
              params={particleOpt}
                />
                <header className='component-header'>
                    <form className='text-container'onSubmit={this.routeChange}>
                        <h1>Enter a Room Number:</h1>
                        <input
                            className="inputBox"
                            type="text"
                            name="textBox"
                            style={{padding: '5px' }}
                            placeholder="####"
                            value={this.state.pin}
                            onChange={this.handleChange}
                        />
                        <div class="divider"/>
                        <input
                            className="button"
                            type="submit"
                            name="title"
                            value= "Join!"
                            placeholder="Search"
                        />
                    </form>
                </header>
            </div>
        )
    }
}

export default JoinPage;