import React from 'react';
import './App.css';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';
import FriendsList from './components/FriendsList';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        friends: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/friends')
        .then(response => {
            this.setState({ friends: response.data })
        })
        .catch(err => {
            console.log('Error: ', err)
        })
  }

  render() {
    return (
      <div className="App">
        <Route path = '/' render = {(props) => <FriendsList {...props} friends = {this.state.friends}/>} />
      </div>
    );
    }
}

export default App;
