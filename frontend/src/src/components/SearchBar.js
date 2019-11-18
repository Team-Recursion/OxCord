import React, { Component } from 'react'
import axios from 'axios';

var info = null

export class SearchBar extends Component {
    state = {
        searchQuery: ''
    }
    parser(time){
        var timeStr = '';
        var hours = '';
        var minutes = '';
        var seconds = '';
        
        var index = time.length-1;
        
        while(index > -1){
            if(time.indexOf('S') !== -1){
                while(time.charAt(index-1) !== 'M' || time.charAt(index-1) !== 'H'|| time.charAt(index-1) !== 'T'){
                    seconds.concat(time.charAt(index-1));
                    index--;  
                }
            }
            else if(time.indexOf('M') !== -1){
                while(time.charAt(index-1) !== 'H'|| time.charAt(index-1) !== 'T'){
                    minutes.concat(time.charAt(index-1));
                    index--;
                }
            }
            else if(time.indexOf('H') !== -1){
                while(time.charAt(index-1) !== 'T'){
                    hours.concat(time.charAt(index-1));
                    index--;
                }
            }
            else{
                index--;
            }
            if(seconds.length == 1){
            }
            if(minutes.length == 1){

            }
            if(hours.length == 1){

            }
        }
        return {hours: hours, minutes: minutes, seconds: seconds}
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
    .then((data) => {
        //console.log('SeachBar.js: responde from yt', data);

    //   var songs = data.data
    //   info = {
    //     'id1': data.data.items[0].id.videoId,
    //     'id2': data.data.items[1].id.videoId,
    //     'id3': data.data.items[2].id.videoId,
    //     'id4':data.data.items[3].id.videoId,
    //     'id5': data.data.items[4].id.videoId
    //   }
        this.info = data.data
        this.props.addRequests(data.data)
        this.setState({searchQuery: ''})


        })
        .catch(err => {
        console.error('SearchBar.js: quiery didnt work');
        })
        console.log(info);

    axios.post('http://localhost:8080/searchController/searchinfo', 'E2y2ey2oPAk')
    .then((res) => {
    //console.log('SeachBar.js: responde from yt', data);
    // this.props.addRequests(data)
    // this.setState({searchQuery: ''})
    })
    .catch(err => {
        console.error('SearchBar.js: info query didnt work');
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
