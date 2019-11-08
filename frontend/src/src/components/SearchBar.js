import React, { Component } from 'react'

export class SearchBar extends Component {
    state = {
        title: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addSong(this.state.title);
        this.setState({ title: ''})
    }

    onChange = (e) => this.setState({title: e.target.value})

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} style={{display: 'flex'}}>
                    <input
                        type="text"
                        name="title"
                        style={{ flex: '10', padding: '5px' }}
                        placeholder="Enter Song Request"
                        value={this.state.title}
                        onChange={this.onChange}
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

export default SearchBar
