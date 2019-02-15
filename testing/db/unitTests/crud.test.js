const { MongoClient } = require('mongodb');
const { dummy, dummies } = require('./sampleData');
const {
  getPlayerInfo,
  getAllPlayers,
  createPlayer,
  updatePlayerInfo,
  deletePlayer,
} = require('../../../db/dbHelpers');

const { Isla, Upton, Dennis } = dummy;
// const mongo = require('../connection/mongo');


const url = 'mongodb://localhost:27017/sheldon-testing';
let client;
let players;

describe('Test CRUD methods for REST application', () => {
  beforeAll(async () => {

    // connect to mongo

    client = await new MongoClient(url, {
      useNewUrlParser: true,
      poolSize: 10,
    });

    // connect to db and seed
    try {
      await client.connect();
      const db = await client.db();
      players = await db.collection('players');
      await players.insertMany(dummies);
    } catch (err) {
      console.log('error during test setup -->', err);
    }

  });
  afterAll(async (done) => {
    // await client.dropCollection('players');
    await client.db().dropCollection('players');
    await client.close(done);
  });

  // Test the READ methods

  test('getPlayerInfo --> should return a player by username', async () => {
    expect.assertions(4);

    // brian is one of our players, lets make sure we can find him
    const Player = await getPlayerInfo('brian', players);

    // should find brian!
    expect(Player).toBeDefined();
    expect(Player.username).toEqual('brian');
    expect(Player._id).toBeDefined();
    expect(Object.keys(Player).length).toEqual(7);
  });

  test('getAllPlayerInfo --> should return all players', async () => {
    expect.assertions(3);

    // lets get all our players from the db!
    const allPlayers = await getAllPlayers(players);
    expect(allPlayers).toBeDefined();
    expect(Array.isArray(allPlayers)).toEqual(true);
    expect(allPlayers.length).toEqual(6);
  });

  // Test the Create method

  test('createPlayer --> should create a new player', async () => {
    expect.assertions(4);

    // save islas username
    const { username } = Isla;

    // make her a player account
    await createPlayer(Isla, players);

    // fetch her info from the db
    const Player = await getPlayerInfo(username, players);

    // save her id for later...
    Isla._id = Player._id;

    // make sure its accurate!
    expect(Player).toBeDefined();
    expect(Player.username).toEqual(username);
    expect(Player._id).toBeDefined();
    expect(Object.keys(Player).length).toEqual(7);
  });

  // Test the Update method

  test('updatePlayerInfo --> should update a players info', async () => {
    expect.assertions(8);
    const { username } = Upton;

    // make a new player
    await createPlayer(Upton, players);

    // fetch his id from the db and save it
    const oldUpton = await getPlayerInfo(username, players);

    const { _id } = oldUpton;

    // save his id for later...
    Upton._id = _id;

    // construct an updated info obj for Upton
    const newUpton = {
      username: 'uptonFoHunnid',
      password: 'salmon1',
      sessionId: 'xxxYYYzzz111',
      wins: 100,
      losses: 1455,
      balance: 12,
    };

    // update his info
    await updatePlayerInfo(_id, newUpton, players);

    // fetch his info from the db
    const Player = await getPlayerInfo(newUpton.username, players);
    const {
      sessionId,
      wins,
      losses,
      balance,
    } = Player;

    // make sure it's the updated info!
    expect(Player).toBeDefined();
    expect(Player.username).toEqual(newUpton.username);
    expect(Player._id).toEqual(_id);
    expect(Object.keys(Player).length).toEqual(7);
    expect(sessionId).toEqual(newUpton.sessionId);
    expect(wins).toEqual(newUpton.wins);
    expect(losses).toEqual(newUpton.losses);
    expect(balance).toEqual(newUpton.balance);
  });

  test('deletePlayer --> should delete a player', async () => {
    expect.assertions(4);
    const { username } = Dennis;

    // make a new player
    await createPlayer(Dennis, players);

    // fetch his id from the db and save it
    const { _id } = await getPlayerInfo(username, players);

    // he's quitting, delete him!
    await deletePlayer(_id, players);

    // fetch his info from the db
    const Player = await getPlayerInfo(username, players);

    // make sure he's gone!
    expect(Player).toBeNull();

    // delete his friends too!
    await deletePlayer(Isla._id, players);
    await deletePlayer(Upton._id, players);
    expect(await getPlayerInfo(Isla.username, players)).toBeNull();
    expect(await getPlayerInfo(Upton.username, players)).toBeNull();
    const allPlayers = await getAllPlayers(players);
    expect(allPlayers.length).toEqual(6);
  });
});
