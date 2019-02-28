import React, { Component } from 'react';

import Results from './Results';

import styles from '../styles/App.css';

const ClientMessage = ({
  playerNumber,
  displayNumber,
  ready,
  disconnected,
  startGame,
  selectionMade,
  receivedResults,
  outcome,
}) => {
  const messages = {
    displayPlayerNumber: `You are player ${playerNumber}`,
    playerIsReady: `Great! waiting for player ${playerNumber === 1 ? 2 : 1} to be ready`,
    waitingPlayerMessage: 'Theres a game in progress. Please wait, you are in the queue!',
    disconnectedMessage: 'Oops! a player disconnected ending the game. A new game will start in 20secs',
    selectionMade: 'Great choice! waiting on opponent...',
  };

  let message;

  if (playerNumber && displayNumber) {
    message = messages.displayPlayerNumber;
  }
  if (ready) {
    message = messages.playerIsReady;
  }
  if (!playerNumber && !disconnected) {
    message = messages.waitingPlayerMessage;
  }
  if (!playerNumber && disconnected) {
    message = messages.disconnectedMessage;
  }
  if (startGame) {
    message = null;
  }
  if (selectionMade && !receivedResults) {
    message = messages.selectionMade;
  }
  if (receivedResults) {
    message = <Results me={playerNumber} outcome={outcome}/>;
  }
  return (
    <div className={styles.text}>
      {message}
    </div>
  );
};

export default ClientMessage;
