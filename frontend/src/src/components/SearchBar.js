import React, { Component } from 'react'
import axios from 'axios';

export class SearchBar extends Component {
    state = {
        searchQuery: ''
    }

    handleChange = (event) => {
        this.setState({searchQuery: event.target.value});
    }

    handleSubmit = (event) => {
      //alert('A name was submitted: ' + this.state.value);
      //console.log('SearchBarjs: currently submitted query', this.state.searchQuery)
      var string = this.state.searchQuery;
      
      const query = {
        "value":string
      };

      axios.post('http://localhost:8080/searchController/search', query)
        .then(data => {
          //console.log('SeachBar.js: responde from yt', data);
          
          this.props.addRequests(data.data)
          this.setState({searchQuery: ''})
        })
        .catch(err => {
          console.error('SearchBar.js: quiery didnt work');
        })
      event.preventDefault();
      //player.cueVideoById("https://www.youtube.com/watch?v=YEJBmmqXUQs");
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} style={{display: 'flex'}}>
                    <input
                        type="text"
                        name="textBox"
                        style={{ flex: '10', padding: '5px' }}
                        placeholder="Enter Song Request"
                        value={this.state.searchQuery}
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

export default SearchBar
