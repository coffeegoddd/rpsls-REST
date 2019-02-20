import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor() {
    super();
    this.state = {

    };
    this.socket = socketIOClient('http://localhost:5500');
    this.handleEmitNewPlayer = this.handleEmitNewPlayer.bind(this);
  }

  componentDidMount() {
    this.handleEmitNewPlayer();
  }

  handleEmitNewPlayer() {
    this.socket.on('newPlayer', (data) => {
      console.log(data);
    });
  }

  render() {
    return (
      <div>
        This is React!
      </div>
    );
  }
}

export default App;