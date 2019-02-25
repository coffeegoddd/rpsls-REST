import React from 'react';

const Results = ({ me, outcome }) => {
  const { results }  = outcome;
  const { winner, loser, isTie, winnerChoice, loserChoice } = results;
  
  let player, winLine;
  let infoLine = `${winnerChoice} beats ${loserChoice}`;

  if (outcome[winner]) {
    player = outcome[winner].username;
  }

  if (isTie) {
    winLine = `We have a tie! Both players threw ${winnerChoice}!`;
    infoLine = null;
  } else if (me === winner) {
    winLine = 'You won!';
  } else if (me === loser) {
    winLine = 'You lost! better luck next time' 
  } else if (!results.winner && !results.loser && !results.isTie) {
    winLine = 'Both players kicked to queue for timing out'
  } else {
    winLine = `${player} wins!`
  }

  return (
    <div>
      <div>{winLine}</div>
      <div>{infoLine}</div>
    </div>
  );
};

export default Results;
