import React, {Component} from 'react';
import './App.css';

class Submit extends Component {

  constructor(props) {
    super(props);
    this.state = { value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  callAPI() {
    fetch("http://localhost:8888/testAPI/submit", {
      method: 'POST',
      body: this.state.value
    })
  }

  componentDidMount() {
    //this.callAPI();
  }

  handleSubmit(event) {
    alert('A request was submitted: ' + this.state.value);
    this.callAPI();
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit= {this.handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}



export default App;
