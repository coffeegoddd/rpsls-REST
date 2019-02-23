import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

import ReadyButton from './ReadyButton';
import GameController from './GameController';

class App extends Component {
  constructor() {
    super();
    this.state = {
      playerNumber: null,
      username: 'malcolmGladwell1',
      sessionId: 'h0tc0ff33',
      socketId: '',
      ready: '',
      renderReady: false,
      queue: '',
      startGame: false,
      gameTimer: '',
      selection: '',
      disconnected: false,
      renderSelectionInfo: false,
    };

    // bind emit handlers
    this.socket = socketIOClient('http://localhost:5500', {transports: ['websocket'], upgrade: false});
    this.handleEmitNewPlayer = this.handleEmitNewPlayer.bind(this);
    this.handleEmitEnableReadyButton = this.handleEmitEnableReadyButton.bind(this);
    this.handleEmitCurrentQueue = this.handleEmitCurrentQueue.bind(this);
    this.handleEmitCompetitorDisconnected = this.handleEmitCompetitorDisconnected.bind(this);
    this.handleEmitSendPlayerInfo = this.handleEmitSendPlayerInfo.bind(this);
    this.handleEmitNewGameSoonCome = this.handleEmitNewGameSoonCome.bind(this);
    this.handleEmitStartGame = this.handleEmitStartGame.bind(this);
    this.handleEmitBegin = this.handleEmitBegin.bind(this);
    this.handleEmitDecrementGameTimer = this.handleEmitDecrementGameTimer.bind(this);

    // bind click handlers
    this.handleReadyButtonOnClick = this.handleReadyButtonOnClick.bind(this);
    this.handleClickUpdateSelection = this.handleClickUpdateSelection.bind(this);

    //bind other methods
    this.intiatilizeGame = this.intiatilizeGame.bind(this);

    this.selectionOptions = [
      // these are the options to choose from
      // will be passed to the GameController as props
      {
        id: 1000,
        choice: 'rock',
        winsAgainst: ['scissors', 'lizard'],
        losesTo: ['paper', 'spock'],
      },
      {
        id: 1001,
        choice: 'paper',
        winsAgainst: ['rock', 'spock'],
        losesTo: ['scissors', 'lizard'],
      },
      {
        id: 1002,
        choice: 'scissors',
        winsAgainst: ['paper', 'lizard'],
        losesTo: ['rock', 'spock'],
      },
      {
        id: 1003,
        choice: 'lizard',
        winsAgainst: ['paper', 'spock'],
        losesTo: ['rock', 'scissors'],
      },
      {
        id: 1004,
        choice: 'spock',
        winsAgainst: ['rock', 'scissors'],
        losesTo: ['paper', 'lizard'],
      },
    ];

    // map for rendering conditionally
    this._map = {
      getNewPlayerInfo: 'signup component',
      waitingPlayerMessage: 'Theres a game in progress. Please wait, you are in the queue!',
      disconnected: 'Oops! a player disconnected ending the game. A new game will start in 20secs',
    };
  }

  componentDidMount() {
    // emission handlers
    this.handleEmitNewPlayer();
    this.handleEmitEnableReadyButton();
    this.handleEmitCurrentQueue();
    this.handleEmitCompetitorDisconnected();
    this.handleEmitSendPlayerInfo();
    this.handleEmitStartGame();
    this.handleEmitBegin();
    this.handleEmitDecrementGameTimer();

    // click handlers
    this.handleEmitNewGameSoonCome();
  }

  handleEmitNewPlayer() {
    this.socket.on('getNewPlayerInfo', ({ message, socketId }) => {
      console.log(message);

      // client should have reference to her socketId
      this.setState({
        socketId,
      });
      // render the signup component
      console.log(`This is where signup/login will render ${this._map['getNewPlayerInfo']}`);

      // after signup, update state
      // username
      // sessionId

      //send info to server
      this.socket.emit('initialInfo', {
        playerNumber: this.state.playerNumber,
        username: this.state.username,
        sessionId: this.state.sessionId,
        socketId: this.state.socketId,
      });
    });
  }

  handleEmitEnableReadyButton() {
    this.socket.on('enableReadyButton', ({ playerNumber, ready }) => {
      console.log('Ready to render the ready button for player 1 and 2');
      console.log('playerNumber -->', playerNumber);

      // conditionally change state
      // if client is player 1 or 2, renderReady is true
      // renderReady will render ready button if true

      this.setState(() => {
        if (playerNumber) {
          return {
            playerNumber,
            ready,
            renderReady: true,
            disconnected: false
          };
        } else {
          return {
            playerNumber,
            ready,
            disconnected: false
          };
        }
      });
    });
  }

  handleEmitCurrentQueue() {
    this.socket.on('currentQueue', ({ queue }) => {
      console.log('received queue -->', queue);
      this.setState({
        queue,
      });
    });
  }

  handleEmitCompetitorDisconnected() {
    this.socket.on('competitorDisconnected', ({ message }) => {
      console.log(message);
      this.setState({
        playerNumber: null,
        ready: false,
        renderReady: false,
        startGame: false,
        gameTimer: '',
        disconnected: true,
      });
    });
  }

  handleEmitSendPlayerInfo() {
    this.socket.on('sendPlayerInfo', ({ message }) => {
      console.log(message);
      this.socket.emit('playerInfoSubsequent', {
        playerNumber: this.state.playerNumber,
        username: this.state.username,
        sessionId: this.state.sessionId,
        socketId: this.state.socketId,
      });
    })
  }

  handleEmitNewGameSoonCome() {
    this.socket.on('newGameSoonCome', ({ message }) => {
      console.log(message);
    });
  }

  handleReadyButtonOnClick() {
    this.setState(() => {
      console.log('click');
      this.socket.emit('playerIsReady', {
        playerNumber: this.state.playerNumber,
        ready: true,
      });
      return { ready: true, renderReady: false };
    });
  }

  handleEmitStartGame() {
    this.socket.on('startIn5secs', ({ message }) => {
      console.log(message);
      // call initializeGame
      this.intiatilizeGame();
    });
  }

  intiatilizeGame() {
    if (!this.state.playerNumber) {
      return;
    } else {
      this.socket.emit('startGame', {
        message: 'Go!',
      });
      // remove the ready button
      this.setState({
        renderReady: false,
      });
    }
  }

  handleEmitBegin() {
    this.socket.on('begin', () => {
      this.setState({
        ready: false,
        startGame: true,
      });
    });
  }

  handleEmitDecrementGameTimer() {
    this.socket.on('decrementGameTimer', ({ gameTimer }) => {
      this.setState({ gameTimer });
    });
  }

  handleClickUpdateSelection(choice) {
    this.setState({
      selection: choice,
    });
  }

  render() {
    return (
      <div>
        <div>Welcome to RPSLS</div>

        {/* display the clients playerNumber if she has one */}
        <div>{this.state.playerNumber ? `You are player ${this.state.playerNumber}` : null}</div>

        {/* render the ready button for the players */}
        <div>{this.state.playerNumber && this.state.renderReady ?
          <ReadyButton handleClick={this.handleReadyButtonOnClick}/> : null}
        </div>

        {/* after shes ready, wait for opponent */}
        <div>{this.state.ready ? `Great! waiting for player ${this.state.playerNumber === 1 ? 2 : 1} to be ready` : null}</div>

        {/* if the client is waiting and not playing, let him know */}
        <div>{!this.state.playerNumber && !this.state.disconnected ? this._map.waitingPlayerMessage : null}</div>

        {/* if a player has disconnected, let everyone know that and how long til the next game */}
        <div>{!this.state.playerNumber && this.state.disconnected ? this._map.disconnected : null}</div>

        {/* render the game controller if the client is playing */}
        <div>{this.state.startGame && this.state.playerNumber ?
          <GameController
            options={this.selectionOptions}
            handleClickUpdateSelection={this.handleClickUpdateSelection}
          /> : null}
        </div>

        {/* show the game timer */}
        <div>{this.state.startGame && this.state.gameTimer && this.state.playerNumber ? this.state.gameTimer : null}</div>
      </div>
    );
  }
}

export default App;