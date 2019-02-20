module.exports = (obj1, obj2) => {
  // this champ object will be returned after evaluation

  const champ = {
    winner: null,
    loser: null,
    isTie: false,
    winnerChoice: '',
    loserChoice: '',
  };


  // game logic to determine who won

  // rock

  if (obj1.selection === 'rock') {
    if (obj2.selection === 'rock') {
      champ.isTie = true;
      champ.winnerChoice = 'rock';
      champ.loserChoice = 'rock';
    } else if (obj2.selection === 'paper') {
      champ.winner = obj2.playerNumber;
      champ.loser = obj1.playerNumber;
      champ.winnerChoice = 'paper';
      champ.loserChoice = 'rock';
    } else if (obj2.selection === 'scissors') {
      champ.winner = obj1.playerNumber;
      champ.loser = obj2.playerNumber;
      champ.winnerChoice = 'rock';
      champ.loserChoice = 'scissors';
    } else if (obj2.selection === 'lizard') {
      champ.winner = obj1.playerNumber;
      champ.loser = obj2.playerNumber;
      champ.winnerChoice = 'rock';
      champ.loserChoice = 'lizard';
    } else if (obj2.selection === 'spock') {
      champ.winner = obj2.playerNumber;
      champ.loser = obj1.playerNumber;
      champ.winnerChoice = 'spock';
      champ.loserChoice = 'rock';
    }
  }

  // paper

  if (obj1.selection === 'paper') {
    if (obj2.selection === 'rock') {
      champ.winner = obj1.playerNumber;
      champ.loser = obj2.playerNumber;
      champ.winnerChoice = 'paper';
      champ.loserChoice = 'rock';
    } else if (obj2.selection === 'paper') {
      champ.isTie = true;
      champ.winnerChoice = 'paper';
      champ.loserChoice = 'paper';
    } else if (obj2.selection === 'scissors') {
      champ.winner = obj2.playerNumber;
      champ.loser = obj1.playerNumber;
      champ.winnerChoice = 'scissors';
      champ.loserChoice = 'paper';
    } else if (obj2.selection === 'lizard') {
      champ.winner = obj2.playerNumber;
      champ.loser = obj1.playerNumber;
      champ.winnerChoice = 'lizard';
      champ.loserChoice = 'paper';
    } else if (obj2.selection === 'spock') {
      champ.winner = obj1.playerNumber;
      champ.loser = obj2.playerNumber;
      champ.winnerChoice = 'paper';
      champ.loserChoice = 'spock';
    }
  }

  // scissors

  if (obj1.selection === 'scissors') {
    if (obj2.selection === 'rock') {
      champ.winner = obj2.playerNumber;
      champ.loser = obj1.playerNumber;
      champ.winnerChoice = 'rock';
      champ.loserChoice = 'scissors';
    } else if (obj2.selection === 'paper') {
      champ.winner = obj1.playerNumber;
      champ.loser = obj2.playerNumber;
      champ.winnerChoice = 'scissors';
      champ.loserChoice = 'paper';
    } else if (obj2.selection === 'scissors') {
      champ.isTie = true;
      champ.winnerChoice = 'scissors';
      champ.loserChoice = 'scissors';
    } else if (obj2.selection === 'lizard') {
      champ.winner = obj1.playerNumber;
      champ.loser = obj2.playerNumber;
      champ.winnerChoice = 'scissors';
      champ.loserChoice = 'lizard';
    } else if (obj2.selection === 'spock') {
      champ.winner = obj2.playerNumber;
      champ.loser = obj1.playerNumber;
      champ.winnerChoice = 'spock';
      champ.loserChoice = 'scissors';
    }
  }

  // lizard

  if (obj1.selection === 'lizard') {
    if (obj2.selection === 'rock') {
      champ.winner = obj2.playerNumber;
      champ.loser = obj1.playerNumber;
      champ.winnerChoice = 'rock';
      champ.loserChoice = 'lizard';
    } else if (obj2.selection === 'paper') {
      champ.winner = obj1.playerNumber;
      champ.loser = obj2.playerNumber;
      champ.winnerChoice = 'lizard';
      champ.loserChoice = 'paper';
    } else if (obj2.selection === 'lizard') {
      champ.isTie = true;
      champ.winnerChoice = 'lizard';
      champ.loserChoice = 'lizard';
    } else if (obj2.selection === 'scissors') {
      champ.winner = obj2.playerNumber;
      champ.loser = obj1.playerNumber;
      champ.winnerChoice = 'scissors';
      champ.loserChoice = 'lizard';
    } else if (obj2.selection === 'spock') {
      champ.winner = obj1.playerNumber;
      champ.loser = obj2.playerNumber;
      champ.winnerChoice = 'lizard';
      champ.loserChoice = 'spock';
    }
  }

  // spock

  if (obj1.selection === 'spock') {
    if (obj2.selection === 'rock') {
      champ.winner = obj1.playerNumber;
      champ.loser = obj2.playerNumber;
      champ.winnerChoice = 'spock';
      champ.loserChoice = 'rock';
    } else if (obj2.selection === 'paper') {
      champ.winner = obj2.playerNumber;
      champ.loser = obj1.playerNumber;
      champ.winnerChoice = 'paper';
      champ.loserChoice = 'spock';
    } else if (obj2.selection === 'spock') {
      champ.isTie = true;
      champ.winnerChoice = 'spock';
      champ.loserChoice = 'spock';
    } else if (obj2.selection === 'lizard') {
      champ.winner = obj2.playerNumber;
      champ.loser = obj1.playerNumber;
      champ.winnerChoice = 'lizard';
      champ.loserChoice = 'spock';
    } else if (obj2.selection === 'scissors') {
      champ.winner = obj1.playerNumber;
      champ.loser = obj2.playerNumber;
      champ.winnerChoice = 'spock';
      champ.loserChoice = 'scissors';
    }
  }

  // if players are not making selections

  if (!obj1.selection && !obj2.selection) {
    champ.winner = null;
    champ.loser = null;
    champ.winnerChoice = null;
    champ.loserChoice = null;
  } else if (obj1.selection && !obj2.selection) {
    champ.winner = obj1.playerNumber;
    champ.loser = obj2.playerNumber;
    champ.winnerChoice = obj1.selection;
    champ.loserChoice = null;
  } else if (!obj1.selection && obj2.selection) {
    champ.winner = obj2.playerNumber;
    champ.loser = obj1.playerNumber;
    champ.winnerChoice = obj2.selection;
    champ.loserChoice = null;
  }

  return champ;
};
