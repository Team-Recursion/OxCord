import React, { Component } from 'react';
import { Route } from 'react-router-dom';

export class JoinPage extends Component {

    constructor() {
        super();
        this.state = {
            pin: '',
            nickname: '',
            toggle: false
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleNicknameInput = this.handleNicknameInput.bind(this);
        this.handleGo = this.handleGo.bind(this)
        this.routeChange = this.routeChange.bind(this);
    }
    handleInput(e) {
        this.setState({
            pin: e.target.value
        })

    }
    handleToggle() {
        this.props.selectedPin(this.state.pin)
        this.setState({
            toggle: true
        })
    }
    handleNicknameInput(e) {
        this.setState({
            nickname: e.target.value
        })
    }
    handleGo() {
        this.routeChange();
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
            <div>
                </div> 
                {/* {
                    !this.state.toggle
                        ?
                        <div className='landing-wrapper' >
                            <div className='logo-container' >
                            </div> 
                            <div className='player-input-wrapper' >
                                <input type='number' value={this.state.pin} placeholder='Kwizz! PIN' onChange={this.handleInput} className='input-user'/>
                                <button onClick={this.handleGo} className='btn-enter' >Enter</button>
                            </div> 
                        </div>
                        :
                        <div className='landing-wrapper' >
                          <div className='logo-container' >
                          </div> 
                        </div>
                } */}
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