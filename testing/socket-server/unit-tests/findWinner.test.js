const findWinner = require('../../../www/socket-server/src/utils/findWinner');

describe('Test findWinner function that determines who won the game', () => {
  it('should return a champ object', () => {
    const champ = findWinner({
      playerNumber: 1,
      selection: 'rock',
    }, {
      playerNumber: 2,
      selection: 'paper',
    });
    expect(champ).toBeDefined();
    const {
      winner,
      winnerChoice,
      loser,
      loserChoice,
    } = champ;
    expect(winner).toBeDefined();
    expect(winnerChoice).toBeDefined();
    expect(loser).toBeDefined();
    expect(loserChoice).toBeDefined();
  });

  it('should know who won with rock', () => {
    // p1 side check

    const vsRock = findWinner({
      playerNumber: 1,
      selection: 'rock',
    }, {
      playerNumber: 2,
      selection: 'rock',
    });

    let vsPaper = findWinner({
      playerNumber: 1,
      selection: 'rock',
    }, {
      playerNumber: 2,
      selection: 'paper',
    });

    let vsScissors = findWinner({
      playerNumber: 1,
      selection: 'rock',
    }, {
      playerNumber: 2,
      selection: 'scissors',
    });

    let vsLizard = findWinner({
      playerNumber: 1,
      selection: 'rock',
    }, {
      playerNumber: 2,
      selection: 'lizard',
    });

    let vsSpock = findWinner({
      playerNumber: 1,
      selection: 'rock',
    }, {
      playerNumber: 2,
      selection: 'spock',
    });

    // vs Rock --> tie
    expect(vsRock.isTie).toBe(true);
    expect(vsRock.winner).toBe(null);
    expect(vsRock.loser).toBe(null);

    // vs Paper --> lose
    expect(vsPaper.winner).toBe(2);
    expect(vsPaper.loser).toBe(1);

    // vs Scissors --> win
    expect(vsScissors.winner).toBe(1);
    expect(vsScissors.loser).toBe(2);

    // vs Lizard --> win
    expect(vsLizard.winner).toBe(1);
    expect(vsLizard.loser).toBe(2);

    // vs Spock --> lose
    expect(vsSpock.winner).toBe(2);
    expect(vsSpock.loser).toBe(1);

    // p2 side check

    vsPaper = findWinner({
      playerNumber: 1,
      selection: 'paper',
    }, {
      playerNumber: 2,
      selection: 'rock',
    });

    vsScissors = findWinner({
      playerNumber: 1,
      selection: 'scissors',
    }, {
      playerNumber: 2,
      selection: 'rock',
    });

    vsLizard = findWinner({
      playerNumber: 1,
      selection: 'lizard',
    }, {
      playerNumber: 2,
      selection: 'rock',
    });

    vsSpock = findWinner({
      playerNumber: 1,
      selection: 'spock',
    }, {
      playerNumber: 2,
      selection: 'rock',
    });

    // vs Paper --> lose
    expect(vsPaper.winner).toBe(1);
    expect(vsPaper.loser).toBe(2);

    // vs Scissors --> win
    expect(vsScissors.winner).toBe(2);
    expect(vsScissors.loser).toBe(1);

    // vs Lizard --> win
    expect(vsLizard.winner).toBe(2);
    expect(vsLizard.loser).toBe(1);

    // vs Spock --> lose
    expect(vsSpock.winner).toBe(1);
    expect(vsSpock.loser).toBe(2);
  });
  it('should know who won with paper', () => {
    // p1 side check

    let vsRock = findWinner({
      playerNumber: 1,
      selection: 'paper',
    }, {
      playerNumber: 2,
      selection: 'rock',
    });

    const vsPaper = findWinner({
      playerNumber: 1,
      selection: 'paper',
    }, {
      playerNumber: 2,
      selection: 'paper',
    });

    let vsScissors = findWinner({
      playerNumber: 1,
      selection: 'paper',
    }, {
      playerNumber: 2,
      selection: 'scissors',
    });

    let vsLizard = findWinner({
      playerNumber: 1,
      selection: 'paper',
    }, {
      playerNumber: 2,
      selection: 'lizard',
    });

    let vsSpock = findWinner({
      playerNumber: 1,
      selection: 'paper',
    }, {
      playerNumber: 2,
      selection: 'spock',
    });

    // vs Rock --> win
    expect(vsRock.winner).toBe(1);
    expect(vsRock.loser).toBe(2);

    // vs Paper --> tie
    expect(vsPaper.isTie).toBe(true);
    expect(vsPaper.winner).toBe(null);
    expect(vsPaper.loser).toBe(null);

    // vs Scissors --> lose
    expect(vsScissors.winner).toBe(2);
    expect(vsScissors.loser).toBe(1);

    // vs Lizard --> lose
    expect(vsLizard.winner).toBe(2);
    expect(vsLizard.loser).toBe(1);

    // vs Spock --> win
    expect(vsSpock.winner).toBe(1);
    expect(vsSpock.loser).toBe(2);


    // p2 side check

    vsRock = findWinner({
      playerNumber: 1,
      selection: 'rock',
    }, {
      playerNumber: 2,
      selection: 'paper',
    });

    vsScissors = findWinner({
      playerNumber: 1,
      selection: 'scissors',
    }, {
      playerNumber: 2,
      selection: 'paper',
    });

    vsLizard = findWinner({
      playerNumber: 1,
      selection: 'lizard',
    }, {
      playerNumber: 2,
      selection: 'paper',
    });

    vsSpock = findWinner({
      playerNumber: 1,
      selection: 'spock',
    }, {
      playerNumber: 2,
      selection: 'paper',
    });

    // vs Rock --> win
    expect(vsRock.winner).toBe(2);
    expect(vsRock.loser).toBe(1);

    // vs Scissors --> lose
    expect(vsScissors.winner).toBe(1);
    expect(vsScissors.loser).toBe(2);

    // vs Lizard --> lose
    expect(vsLizard.winner).toBe(1);
    expect(vsLizard.loser).toBe(2);

    // vs Spock --> win
    expect(vsSpock.winner).toBe(2);
    expect(vsSpock.loser).toBe(1);
  });

  it('should know who won with scissors', () => {
    // p1 side check

    let vsRock = findWinner({
      playerNumber: 1,
      selection: 'scissors',
    }, {
      playerNumber: 2,
      selection: 'rock',
    });

    let vsPaper = findWinner({
      playerNumber: 1,
      selection: 'scissors',
    }, {
      playerNumber: 2,
      selection: 'paper',
    });

    const vsScissors = findWinner({
      playerNumber: 1,
      selection: 'scissors',
    }, {
      playerNumber: 2,
      selection: 'scissors',
    });

    let vsLizard = findWinner({
      playerNumber: 1,
      selection: 'scissors',
    }, {
      playerNumber: 2,
      selection: 'lizard',
    });

    let vsSpock = findWinner({
      playerNumber: 1,
      selection: 'scissors',
    }, {
      playerNumber: 2,
      selection: 'spock',
    });

    // vs Rock --> lose
    expect(vsRock.winner).toBe(2);
    expect(vsRock.loser).toBe(1);

    // vs Paper --> win
    expect(vsPaper.winner).toBe(1);
    expect(vsPaper.loser).toBe(2);

    // vs Scissors --> tie
    expect(vsScissors.isTie).toBe(true);
    expect(vsScissors.winner).toBe(null);
    expect(vsScissors.loser).toBe(null);

    // vs Lizard --> win
    expect(vsLizard.winner).toBe(1);
    expect(vsLizard.loser).toBe(2);

    // vs Spock --> lose
    expect(vsSpock.winner).toBe(2);
    expect(vsSpock.loser).toBe(1);


    // p2 side check

    vsRock = findWinner({
      playerNumber: 1,
      selection: 'rock',
    }, {
      playerNumber: 2,
      selection: 'scissors',
    });

    vsPaper = findWinner({
      playerNumber: 1,
      selection: 'paper',
    }, {
      playerNumber: 2,
      selection: 'scissors',
    });

    vsLizard = findWinner({
      playerNumber: 1,
      selection: 'lizard',
    }, {
      playerNumber: 2,
      selection: 'scissors',
    });

    vsSpock = findWinner({
      playerNumber: 1,
      selection: 'spock',
    }, {
      playerNumber: 2,
      selection: 'scissors',
    });

    // vs Rock --> lose
    expect(vsRock.winner).toBe(1);
    expect(vsRock.loser).toBe(2);

    // vs Paper --> win
    expect(vsPaper.winner).toBe(2);
    expect(vsPaper.loser).toBe(1);

    // vs Lizard --> win
    expect(vsLizard.winner).toBe(2);
    expect(vsLizard.loser).toBe(1);

    // vs Spock --> lose
    expect(vsSpock.winner).toBe(1);
    expect(vsSpock.loser).toBe(2);
  });

  it('should know who won with lizard', () => {
    // p1 side check

    let vsRock = findWinner({
      playerNumber: 1,
      selection: 'lizard',
    }, {
      playerNumber: 2,
      selection: 'rock',
    });

    let vsPaper = findWinner({
      playerNumber: 1,
      selection: 'lizard',
    }, {
      playerNumber: 2,
      selection: 'paper',
    });

    let vsScissors = findWinner({
      playerNumber: 1,
      selection: 'lizard',
    }, {
      playerNumber: 2,
      selection: 'scissors',
    });

    const vsLizard = findWinner({
      playerNumber: 1,
      selection: 'lizard',
    }, {
      playerNumber: 2,
      selection: 'lizard',
    });

    let vsSpock = findWinner({
      playerNumber: 1,
      selection: 'lizard',
    }, {
      playerNumber: 2,
      selection: 'spock',
    });

    // vs Rock --> lose
    expect(vsRock.winner).toBe(2);
    expect(vsRock.loser).toBe(1);

    // vs Paper --> win
    expect(vsPaper.winner).toBe(1);
    expect(vsPaper.loser).toBe(2);

    // vs Scissors --> lose
    expect(vsScissors.winner).toBe(2);
    expect(vsScissors.loser).toBe(1);

    // vs Lizard --> tie
    expect(vsLizard.isTie).toBe(true);
    expect(vsLizard.winner).toBe(null);
    expect(vsLizard.loser).toBe(null);

    // vs Spock --> win
    expect(vsSpock.winner).toBe(1);
    expect(vsSpock.loser).toBe(2);

    // p2 side check

    vsRock = findWinner({
      playerNumber: 1,
      selection: 'rock',
    }, {
      playerNumber: 2,
      selection: 'lizard',
    });

    vsPaper = findWinner({
      playerNumber: 1,
      selection: 'paper',
    }, {
      playerNumber: 2,
      selection: 'lizard',
    });

    vsScissors = findWinner({
      playerNumber: 1,
      selection: 'scissors',
    }, {
      playerNumber: 2,
      selection: 'lizard',
    });

    vsSpock = findWinner({
      playerNumber: 1,
      selection: 'spock',
    }, {
      playerNumber: 2,
      selection: 'lizard',
    });

    // vs Rock --> lose
    expect(vsRock.winner).toBe(1);
    expect(vsRock.loser).toBe(2);

    // vs Paper --> win
    expect(vsPaper.winner).toBe(2);
    expect(vsPaper.loser).toBe(1);

    // vs Scissors --> lose
    expect(vsScissors.winner).toBe(1);
    expect(vsScissors.loser).toBe(2);

    // vs Spock --> win
    expect(vsSpock.winner).toBe(2);
    expect(vsSpock.loser).toBe(1);
  });

  it('should know who won with spock', () => {
    // p1 side check

    let vsRock = findWinner({
      playerNumber: 1,
      selection: 'spock',
    }, {
      playerNumber: 2,
      selection: 'rock',
    });

    let vsPaper = findWinner({
      playerNumber: 1,
      selection: 'spock',
    }, {
      playerNumber: 2,
      selection: 'paper',
    });

    let vsScissors = findWinner({
      playerNumber: 1,
      selection: 'spock',
    }, {
      playerNumber: 2,
      selection: 'scissors',
    });

    let vsLizard = findWinner({
      playerNumber: 1,
      selection: 'spock',
    }, {
      playerNumber: 2,
      selection: 'lizard',
    });

    const vsSpock = findWinner({
      playerNumber: 1,
      selection: 'spock',
    }, {
      playerNumber: 2,
      selection: 'spock',
    });

    // vs Rock --> wins
    expect(vsRock.winner).toBe(1);
    expect(vsRock.loser).toBe(2);

    // vs Paper --> lose
    expect(vsPaper.winner).toBe(2);
    expect(vsPaper.loser).toBe(1);

    // vs Scissors --> wins
    expect(vsScissors.winner).toBe(1);
    expect(vsScissors.loser).toBe(2);

    // vs Lizard --> lose
    expect(vsLizard.winner).toBe(2);
    expect(vsLizard.loser).toBe(1);

    // vs Spock --> tie
    expect(vsSpock.isTie).toBe(true);
    expect(vsSpock.winner).toBe(null);
    expect(vsSpock.loser).toBe(null);

    // p2 side check

    vsRock = findWinner({
      playerNumber: 1,
      selection: 'rock',
    }, {
      playerNumber: 2,
      selection: 'spock',
    });

    vsPaper = findWinner({
      playerNumber: 1,
      selection: 'paper',
    }, {
      playerNumber: 2,
      selection: 'spock',
    });

    vsScissors = findWinner({
      playerNumber: 1,
      selection: 'scissors',
    }, {
      playerNumber: 2,
      selection: 'spock',
    });

    vsLizard = findWinner({
      playerNumber: 1,
      selection: 'lizard',
    }, {
      playerNumber: 2,
      selection: 'spock',
    });

    // vs Rock --> wins
    expect(vsRock.winner).toBe(2);
    expect(vsRock.loser).toBe(1);

    // vs Paper --> lose
    expect(vsPaper.winner).toBe(1);
    expect(vsPaper.loser).toBe(2);

    // vs Scissors --> wins
    expect(vsScissors.winner).toBe(2);
    expect(vsScissors.loser).toBe(1);

    // vs Lizard --> lose
    expect(vsLizard.winner).toBe(1);
    expect(vsLizard.loser).toBe(2);
  });

  it('should handle two null selections', () => {
    const p1First = findWinner({
      playerNumber: 1,
      selection: null,
    }, {
      playerNumber: 2,
      selection: null,
    });

    const p2First = findWinner({
      playerNumber: 2,
      selection: null,
    }, {
      playerNumber: 1,
      selection: null,
    });

    expect(p1First.winner).toBeNull();
    expect(p1First.winnerChoice).toBeNull();
    expect(p1First.loser).toBeNull();
    expect(p1First.loserChoice).toBeNull();
    expect(p1First.isTie).toBe(false);

    expect(p2First.winner).toBeNull();
    expect(p2First.winnerChoice).toBeNull();
    expect(p2First.loser).toBeNull();
    expect(p2First.loserChoice).toBeNull();
    expect(p2First.isTie).toBe(false);
  });

  it('should handle a single null selection', () => {
    const p1First = findWinner({
      playerNumber: 1,
      selection: null,
    }, {
      playerNumber: 2,
      selection: 'spock',
    });

    const p2First = findWinner({
      playerNumber: 2,
      selection: 'rock',
    }, {
      playerNumber: 1,
      selection: null,
    });

    // p1 side check

    expect(p1First.winner).toBe(2);
    expect(p1First.winnerChoice).toBe('spock');
    expect(p1First.loser).toBe(1);
    expect(p1First.loserChoice).toBe(null);
    expect(p1First.isTie).toBe(false);

    // p2 side check

    expect(p2First.winner).toBe(2);
    expect(p2First.winnerChoice).toBe('rock');
    expect(p2First.loser).toBe(1);
    expect(p2First.loserChoice).toBe(null);
    expect(p2First.isTie).toBe(false);
  });
});
