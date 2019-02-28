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
  };
  
  let playerWin, playerLose, winLine, recap, result;
  let infoLine = `${capitalizeChoice[winnerChoice]} beats ${capitalizeChoice[loserChoice]}.`;

  if (outcome[winner]) {
    playerWin = outcome[winner].username;
  }
  if (outcome[loser]) {
    playerLose = outcome[loser].username;
  }

  if (isTie) {
    infoLine = `Both players threw ${capitalizeChoice[winnerChoice]}!`;
    result = 'tie';
    if (me) {
      winLine = 'YOU TIED';
    } else {
      winLine = 'THEY TIED';
    }
  } else if (me === winner) {
    recap = `You threw ${capitalizeChoice[winnerChoice]} and ${playerLose} threw ${capitalizeChoice[loserChoice]}.`;
    result = 'win';
    winLine = 'YOU WIN';
  } else if (me === loser) {
    recap = `${playerWin} threw ${capitalizeChoice[winnerChoice]} and you threw ${capitalizeChoice[loserChoice]}.`;
    result = 'lose';
    winLine = 'YOU LOST'; 
  } else if (!results.winner && !results.loser && !results.isTie) {
    result = 'doubleTimeOut';
    winLine = 'Both players kicked to queue for timing out';
  } else {
    recap = `${playerWin} threw ${capitalizeChoice[winnerChoice]} and ${playerLose} threw ${capitalizeChoice[loserChoice]}.`;
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
