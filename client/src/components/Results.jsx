import React from 'react';

const Results = ({ me, outcome }) => {
  const { results }  = outcome;
  const { winner, loser, isTie, winnerChoice, loserChoice } = results;
  
  let playerWin, playerLose, winLine, recap;
  let infoLine = `${winnerChoice} beats ${loserChoice}.`;

  if (outcome[winner]) {
    playerWin = outcome[winner].username;
  }
  if (outcome[loser]) {
    playerLose = outcome[loser].username;
  }

  if (isTie) {
    winLine = `We have a tie! Both players threw ${winnerChoice}!`;
    infoLine = null;
  } else if (me === winner) {
    recap = `You threw ${winnerChoice} and ${playerLose} threw ${loserChoice}.`;
    winLine = 'You won!';
  } else if (me === loser) {
    recap = `${playerWin} threw ${winnerChoice} and you threw ${loserChoice}.`;
    winLine = 'You lost.' 
  } else if (!results.winner && !results.loser && !results.isTie) {
    winLine = 'Both players kicked to queue for timing out'
  } else {
    recap = `${playerWin} threw ${winnerChoice} and ${playerLose} threw ${loserChoice}.`;
    winLine = `${playerWin} wins!`
  }

  return (
    <div>
      <div>{recap}</div>
      <div>{infoLine}</div>
      <div>{winLine}</div>
      <div>A new game will begin shortly...</div>
    </div>
  );
};

export default Results;
