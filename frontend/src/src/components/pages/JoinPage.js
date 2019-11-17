import React, { Component } from 'react';
import axios from 'axios';

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
      
        let result = await axios.get("http://localhost:8080/dbController/doesRoomExist", query);
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
                <form onSubmit={this.routeChange} style={{width: '800px', margin: '0 auto'}}>
                    <input
                        type="number"
                        name="textBox"
                        style={{ flex: '10', padding: '5px' }}
                        placeholder="Enter Room Number"
                        value={this.state.pin}
                        onChange={this.handleChange}
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

export default JoinPage;