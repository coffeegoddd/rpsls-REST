import React from 'react';

import styles from '../styles/Results.css';

const Results = ({ me, outcome }) => {
  const { results }  = outcome;
  const { winner, loser, isTie, winnerChoice, loserChoice } = results;
  const capitalizeChoice = {
    rock: 'Rock',
    paper: 'Paper',
    scissors: 'Scissors',
    lizard: 'Lizard',
    spock: 'Spock',
    timeout: 'Timeout',
  };
  
  let playerWin, playerLose, winLine, recap, result;

  let winSelection = winnerChoice || 'timeout';
  let loseSelection = loserChoice || 'timeout';

  let infoLine = `${capitalizeChoice[winSelection]} beats ${capitalizeChoice[loseSelection]}.`;

  if (outcome[winner]) {
    playerWin = outcome[winner].username;
  }
  if (outcome[loser]) {
    playerLose = outcome[loser].username;
  }

  if (isTie) {
    infoLine = `Both players threw ${capitalizeChoice[winSelection]}!`;
    result = 'tie';
    if (me) {
      winLine = 'YOU TIED';
    } else {
      winLine = 'THEY TIED';
    }
  } else if (me === winner) {
    recap = `You threw ${capitalizeChoice[winSelection]} and ${playerLose} threw ${capitalizeChoice[loseSelection]}.`;
    result = 'win';
    winLine = 'YOU WON';
  } else if (me === loser) {
    recap = `${playerWin} threw ${capitalizeChoice[winSelection]} and you threw ${capitalizeChoice[loseSelection]}.`;
    result = 'lose';
    winLine = 'YOU LOST'; 
  } else if (!results.winner && !results.loser && !results.isTie) {
    result = 'doubleTimeOut';
    infoLine = 'Both players kicked to queue for timing out';
    winLine = null;
  } else {
    recap = `${playerWin} threw ${capitalizeChoice[winSelection]} and ${playerLose} threw ${capitalizeChoice[loseSelection]}.`;
    result = 'wait';
    winLine = `${playerWin} WINS`
  }

  return (
    <div>
      <div>{recap}</div>
      <div>{infoLine}</div>
      <div className={styles[result]}>{winLine}</div>
      <div>A new game will begin shortly...</div>
    </div>
  );
};

export default Results;
