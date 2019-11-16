import React, { Component } from 'react';

export class JoinPage extends Component {

    constructor() {
        super();
        this.state = {
            pin: '',
        }
        this.routeChange = this.routeChange.bind(this);
    }
    routeChange() {
    let path = `/searchPage`;
    this.props.history.push({
        pathname: path,
        data: this.state.pin
    });
    }
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
                        type="text"
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