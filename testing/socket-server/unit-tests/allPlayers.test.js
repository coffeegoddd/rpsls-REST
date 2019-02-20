const AllPlayers = require('../../../www/socket-server/src/utils/allPlayers');
const dummies = require('./sampleData');

describe('Test AllPlayers class for application', () => {
  it('dummies should have the required properties', () => {
    const { username, sessionId, socketId } = dummies[0];
    expect(Object.keys(dummies[0]).length).toBe(8);
    expect(username).toBeDefined();
    expect(sessionId).toBeDefined();
    expect(socketId).toBeDefined();
  });

  it('should make sure players have the right properties', () => {
    const players = new AllPlayers();
    const [first] = dummies;

    // valid properties found
    players.enQ(first);
    expect(players.qCount()).toBe(1);

    // missing username
    let result = players.enQ({ sessionId: 'hammer', socketId: 'toad', wins: 100000 });
    expect(result).toBe('username, sessionId, socketId are required');
    expect(players.qCount()).toBe(1);

    // missing sessionId
    result = players.enQ({ username: 'hammer', socketId: 'toad', wins: 100000 });
    expect(result).toBe('username, sessionId, socketId are required');
    expect(players.qCount()).toBe(1);

    // missing socketId
    result = players.enQ({ username: 'hammer', sessionId: 'toad', wins: 100000 });
    expect(result).toBe('username, sessionId, socketId are required');
    expect(players.qCount()).toBe(1);

    // has null fields
    result = players.enQ({ username: '', socketId: '', sessionId: '' });
    expect(result).toBe('username, sessionId, socketId are required');
    expect(players.qCount()).toBe(1);
  });

  it('should add players correctly, one at a time', () => {
    const players = new AllPlayers();
    const [first, second, third] = dummies;

    // add to players to the queue
    players.enQ(first);

    expect(players.qCount()).toBe(1);

    // then move to players if possible
    players.addPlayersFromQ();

    expect(players.qCount()).toBe(0);
    expect(players.getP1).toBe(first);

    // add a new player
    players.enQ(second);

    expect(players.qCount()).toBe(1);

    // then move to players if possible
    players.addPlayersFromQ();

    expect(players.qCount()).toBe(0);
    expect(players.getP1).toBe(first);
    expect(players.getP2).toEqual(second);

    // new player joins
    players.enQ(third);

    expect(players.qCount()).toBe(1);

    // a player leaves, the open slot is filled
    // players.removePlayer = { playerNumber: 1 };
    players.removePlayer = first;

    expect(players.qCount()).toBe(1);
    expect(players.getP1).toBe(null);
    expect(players.getP2).toEqual(second);

    // update the players
    players.addPlayersFromQ();
    expect(players.qCount()).toBe(0);
    expect(players.getP1).toBe(third);
    expect(players.getP2).toEqual(second);

    // again from for p2 side
    players.enQ(first);

    expect(players.qCount()).toBe(1);

    // players.removePlayer = { playerNumber: 2 };
    players.removePlayer = second;

    expect(players.qCount()).toBe(1);
    expect(players.getP1).toBe(third);
    expect(players.getP2).toEqual(null);

    players.addPlayersFromQ();
    expect(players.qCount()).toBe(0);
    expect(players.getP1).toBe(third);
    expect(players.getP2).toEqual(first);
  });

  it('removePlayer should remove a player from players', () => {
    const players = new AllPlayers();
    const [first, second] = dummies;

    players.enQ(first);
    players.enQ(second);

    expect(players.qCount()).toBe(2);

    players.addPlayersFromQ();

    expect(players.qCount()).toBe(0);
    expect(players.getP1).toBe(first);
    expect(players.getP2).toBe(second);

    // add a playerNumber to first player
    // first.playerNumber = 1;

    players.removePlayer = first;

    expect(players.qCount()).toBe(0);
    expect(players.getP1).toBe(null);
    expect(players.getP2).toBe(second);
  });

  it('if there are no players, it should add 2 players from queue to players', () => {
    const players = new AllPlayers();
    const [first, second] = dummies;

    // add to players to the queue
    players.enQ(first);
    players.enQ(second);

    expect(players.qCount()).toBe(2);

    // if the players slots are open
    // move people from queue to player slots
    players.addPlayersFromQ();

    expect(players.qCount()).toBe(0);
    expect(players.getP1).toEqual(first);
    expect(players.getP2).toEqual(second);
  });

  it('addPlayersFromQ should not change players if players is full', () => {
    const players = new AllPlayers();
    const [first, second, third] = dummies;

    // two players join
    players.enQ(first);
    players.enQ(second);

    expect(players.qCount()).toBe(2);

    // add to players if empty
    players.addPlayersFromQ();

    expect(players.qCount()).toBe(0);
    expect(players.getP1).toBe(first);
    expect(players.getP2).toBe(second);

    // third player joins
    players.enQ(third);

    expect(players.qCount()).toBe(1);

    // should not change players or queue
    players.addPlayersFromQ();

    expect(players.qCount()).toBe(1);
    expect(players.getP1).toBe(first);
    expect(players.getP2).toBe(second);
    expect(players.front()).toBe(third);
  });

  it('cycle should only accept objects with playerNumber property', () => {
    const players = new AllPlayers();
    const [first, second, third] = dummies;

    players.enQ(first);
    players.enQ(second);
    players.enQ(third);

    players.addPlayersFromQ();

    expect(players.qCount()).toBe(1);
    expect(players.getP1).toBe(first);
    expect(players.getP2).toBe(second);

    // player 1 loses and loser object is valid
    // players.cycle({ playerNumber: 1 });
    players.cycle(first);
    expect(players.qCount()).toBe(1);
    expect(players.getP1).toBe(third);
    expect(players.getP2).toBe(second);

    // player 1 loses and loser object is invalid
    // expect(players.cycle({ player: 1 }))
    expect(players.cycle(first))
      .toBe('loser object must have property playerNumber');

    // player 1 loses, loser object valid, but number invalid
    expect(players.cycle({ playerNumber: 97 }))
      .toBe('playerNumber MUST be 1 or 2');
  });

  it('should remove the loser and push the loser to the queue', () => {
    const players = new AllPlayers();
    const [first, second, third, fourth] = dummies;

    // add 6 players to the game
    for (let i = 0; i < 6; i += 1) {
      players.enQ(dummies[i]);
    }

    expect(players.qCount()).toBe(6);

    // add players
    players.addPlayersFromQ();

    expect(players.qCount()).toBe(4);
    expect(players.getP1).toBe(first);
    expect(players.getP2).toBe(second);

    // player 1 loses
    // players.cycle({ playerNumber: 1 });
    players.cycle(first);

    expect(players.qCount()).toBe(4);
    expect(players.getP1).toBe(third);

    // winner stays on
    expect(players.getP2).toBe(second);

    // player 2 loses
    // players.cycle({ playerNumber: 2 });
    players.cycle(second);
    expect(players.qCount()).toBe(4);
    expect(players.getP1).toBe(third);
    expect(players.getP2).toBe(fourth);
  });

  it('should not cycle when the queue is empty', () => {
    const players = new AllPlayers();
    const [first, second] = dummies;

    players.enQ(first);
    players.enQ(second);

    expect(players.qCount()).toBe(2);

    // add players from queue to players
    players.addPlayersFromQ();
    expect(players.qCount()).toBe(0);
    expect(players.getP1).toBe(first);
    expect(players.getP2).toBe(second);

    // player 1 loses
    players.cycle(first);
    expect(players.qCount()).toBe(0);
    expect(players.getP1).toBe(first);
    expect(players.getP2).toBe(second);

    // player 2 loses
    // players.cycle({ playerNumber: 2 });
    players.cycle(second);
    expect(players.qCount()).toBe(0);
    expect(players.getP1).toBe(first);
    expect(players.getP2).toBe(second);
  });

  it('should know when two players are ready', () => {
    const players = new AllPlayers();
    const [first, second] = dummies;

    players.enQ(first);
    players.addPlayersFromQ();

    expect(players.qCount()).toBe(0);
    expect(players.bothPlayersReady()).toBe(false);

    players.enQ(second);
    players.addPlayersFromQ();

    expect(players.qCount()).toBe(0);
    expect(players.bothPlayersReady()).toBe(true);
  });

  it('should remove disconnected players', () => {
    const players = new AllPlayers();
    const [first, second, third] = dummies;
    const sixth = dummies[5];

    // add players to game
    dummies.forEach((dummy) => {
      players.enQ(dummy);
    });

    expect(players.qCount()).toBe(10);

    // let first two play

    players.addPlayersFromQ();

    expect(players.qCount()).toBe(8);
    expect(players.getP1).toBe(first);
    expect(players.getP2).toBe(second);


    // add playerNumber property to relevant players
    // first.playerNumber = 1;
    // second.playerNumber = 2;

    // player 1 disconnects
    players.removeDisconnector(first);

    expect(players.qCount()).toBe(8);
    expect(players.getP1).toBe(null);
    expect(players.getP2).toBe(second);

    // update the players
    players.addPlayersFromQ();

    expect(players.qCount()).toBe(7);
    expect(players.getP1).toBe(third);
    expect(players.getP2).toBe(second);

    // player in queue disconnects
    players.removeDisconnector(sixth);
    expect(players.qCount()).toBe(6);
    expect(players.getP1).toBe(third);
    expect(players.getP2).toBe(second);
  });
});
