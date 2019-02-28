import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

// import React components
import ClientMesage from './ClientMessage';
import ReadyButton from './ReadyButton';
import GameController from './GameController';
import Queue from './Queue';


// import styles
import stylesApp from '../styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      playerNumber: null,
      username: 'malcolmGladwell1',
      sessionId: 'h0tc0ff33',
      socketId: '',
      displayNumber: false,
      ready: '',
      renderReady: false,
      queue: '',
      qCount: 0,
      startGame: false,
      gameTimer: '',
      selection: '',
      disconnected: false,
      renderSelectionInfo: false,
      selectionMade: false,
      receivedResults: false,
      results: '',
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
    this.handleEmitResults = this.handleEmitResults.bind(this);
    this.handleEmitSendSelection = this.handleEmitSendSelection.bind(this);

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
    this.handleEmitResults();
    this.handleEmitSendSelection();

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
      // render the signup component below

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
            disconnected: false,
            selection: '',
            selectionMade: false,
            receivedResults: false,
            displayNumber: true,
            gameTimer: '',
          };
        } else {
          return {
            playerNumber,
            ready,
            disconnected: false,
            selection: '',
            selectionMade: false,
            receivedResults: false,
            displayNumber: true,
            gameTimer: '',
          };
        }
      });
    });
  }

  handleEmitCurrentQueue() {
    this.socket.on('currentQueue', ({ queue }) => {
      console.log('received queue -->', queue);
      const qCount = queue.length;
      this.setState({
        queue,
        qCount,
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
        selection: '',
        selectionMade: false,
        receivedResults: false,
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
      this.socket.emit('playerIsReady', {
        playerNumber: this.state.playerNumber,
        ready: true,
      });
      return { ready: true, renderReady: false, displayNumber: false, };
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

  handleClickUpdateSelection(selection) {
    this.setState({
      ready: false,
      selection,
      selectionMade: true,
    });
    this.socket.emit('selection', {
      playerNumber: this.state.playerNumber,
      username: this.state.username,
      socketId: this.state.socketId,
      sessionId: this.state.socketId,
      selection,
    });
  }

  handleEmitResults() {
    this.socket.on('results', (results) => {
      console.log('results -->', results);
      this.setState({
        startGame: false,
        gameTimer: '',
        receivedResults: true,
        results,
      });
    });
  }

  handleEmitSendSelection() {
    this.socket.on('sendSelection', ({ message }) => {
      console.log(message);
      this.setState((state) => {
        if (!state.playerNumber) {
          return;
        }
        if (state.selectionMade) {
          return;
        }
        this.socket.emit('selection', {
          playerNumber: this.state.playerNumber,
          username: this.state.username,
          socketId: this.state.socketId,
          sessionId: this.state.socketId,
          selection: null,
        });
        return { selectionMade: true };
      });
    });
  }

  render() {
    return (
      <div className={stylesApp.mainContainer}>
        <div className={stylesApp.gameViewContainer}>
          <div className={stylesApp.title}>Welcome to RPSLS</div>
          { this.state.startGame && this.state.playerNumber && this.state.gameTimer ? <div className={[stylesApp.text, stylesApp.timer].join(' ')}>{this.state.startGame && this.state.gameTimer && this.state.playerNumber ? this.state.gameTimer : null }</div> : null }
          <ClientMesage
            playerNumber={this.state.playerNumber}
            displayNumber={this.state.displayNumber}
            ready={this.state.ready}
            disconnected={this.state.disconnected}
            startGame={this.state.startGame}
            selectionMade={this.state.selectionMade}
            receivedResults={this.state.receivedResults}
            outcome={this.state.results}
          />
          <div>{this.state.startGame && this.state.playerNumber && !this.state.selectionMade ?
            <GameController
              options={this.selectionOptions}
              handleClickUpdateSelection={this.handleClickUpdateSelection}
            /> : null }
          </div>
          <div>
            <div className={stylesApp.ready}>{this.state.playerNumber && this.state.renderReady && !this.state.startGame ?
              <ReadyButton handleClick={this.handleReadyButtonOnClick}/> : null }
            </div>
          </div>
        </div>
        {/* <div className={stylesApp.queue}>
            { this.state.qCount ? <Queue queue={this.state.queue}/> : null }
        </div> */}
      </div>
    );
  }
}

export default App;