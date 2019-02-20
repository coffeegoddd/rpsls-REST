const AllPlayers = require('../../../www/socket-server/src/utils/allPlayers');
const dummies = require('./sampleData');

describe('Test AllPlayers class for application', () => {
  it('if there are no players, it should add them to players', () => {
    const players = new AllPlayers();
    const [first, second] = dummies;

    players.addPlayer = first;
    expect(players.playerOne).toEqual(first);

    players.addPlayer = second;
    expect(players.playerTwo).toEqual(second);
  });

  // it('if there are players, it should queue them');
  // it('should only add players from the queue');
  // it('should recycle players after a loss');
  // it('should remove disconnected players');
  // it('should know when two players are ready');
});
