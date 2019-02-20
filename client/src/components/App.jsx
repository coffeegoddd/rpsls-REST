import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor() {
    super();
    this.state = {
      playerNumber: null,
      username: 'malcolmGladwell1',
      sessionId: 'h0tc0ff33',
      socketId: '',
      ready: false,
      queue: '',
    };
    this.eventMap = {
      getNewPlayerInfo: 'signup component',
    };
    this.socket = socketIOClient('http://localhost:5500');
    this.handleEmitNewPlayer = this.handleEmitNewPlayer.bind(this);
    this.handleEmitEnableReadyButton = this.handleEmitEnableReadyButton.bind(this);
  }

  componentDidMount() {
    this.handleEmitNewPlayer();
    this.handleEmitEnableReadyButton();
  }

  handleEmitNewPlayer() {
    this.socket.on('getNewPlayerInfo', ({ message, socketId }) => {
      console.log(message);

      // client should have reference to her socketId
      this.setState({
        socketId,
      });
      // render the signup component
      console.log(`This is where signup/login will render ${this.eventMap['getNewPlayerInfo']}`);

      // after signup, update state
      // username
      // sessionId

      //send info to server
      this.socket.emit('playerInfo', {
        playerNumber: this.state.playerNumber,
        username: this.state.username,
        sessionId: this.state.sessionId,
        socketId: this.state.socketId,
        ready: this.state.ready,
      });
    });
  }

  handleEmitEnableReadyButton() {
    this.socket.on('enableReadyButton', ({ playerNumber, queue }) => {
      console.log('Ready to render the ready button for player 1 and 2');
      console.log('playerNumber -->', playerNumber);
      console.log('current queue -->', queue);
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