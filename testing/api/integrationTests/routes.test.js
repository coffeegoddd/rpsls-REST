const request = require('supertest');
const { MongoClient } = require('mongodb');
const express = require('express');
const parser = require('body-parser');
const router = require('../../../www/api/src/routes');
const dummies = require('./sampleData');

const app = express();

let client;
let db;
let players;

describe('Test api routes for application', () => {
  beforeAll(async () => {

    // connect to a test database

    client = await new MongoClient('mongodb://localhost:27017/sheldon-testing', {
      useNewUrlParser: true,
      poolSize: 10,
    });

    await client.connect();
    db = await client.db();
    players = await db.collection('players');

    // add some sample data

    await players.insertMany(dummies);

    // send the db connection to our controller
    // through middleware

    app.use(parser.json());
    app.use(parser.urlencoded({
      extended: true,
    }));
    app.use((req, res, next) => {
      req.DB = db;
      next();
    });
    app.use('/api', router);
  });

  afterAll(async () => {
    await db.dropCollection('players');
    await client.close();
  });

  // Test the GET routes

  it('should return the info of a single player', (done) => {
    request(app)
      .get('/api/player/hubert')
      .expect(200)
      .then(({ text }) => {
        const data = JSON.parse(text);
        expect(data).toBeDefined();
        expect(data.username).toEqual('hubert');
        expect(data._id).toBeDefined();
        expect(Object.keys(data).length).toEqual(7);
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });

  it('should return a 404 from a bad single player query', (done) => {
    request(app)
      .get('/api/player/.mikey')
      .expect(404)
      .then(({ text }) => {
        expect(text).toBe('content not found');
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });

  it('should return info of all players', async (done) => {
    request(app)
      .get('/api/players')
      .expect(200)
      .then(({ text }) => {
        const data = JSON.parse(text);
        expect(Array.isArray(data)).toEqual(true);
        expect(data.length).toEqual(10);
        expect(data[2].username).toBeDefined();
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });

  // // Test the POST route

  it('should create a new player', (done) => {
    request(app)
      .post('/api/player')
      .send({
        username: 'clyde',
        password: 'cartmanSux',
        sessionId: 'aaafrgsdfgsdf',
        wins: 21,
        losses: 45,
        balance: 1800,
      })
      .expect(201)
      .then(({ text }) => {
        expect(text).toBe('account created!');
        // done();
        request(app)
          .get('/api/player/clyde')
          .expect(200)
          .then(({ text }) => {
            const data = JSON.parse(text);
            expect(data).toBeDefined();
            expect(data.username).toEqual('clyde');
            expect(data._id).toBeDefined();
            expect(data.balance).toEqual(1800);
            expect(data.sessionId).toEqual('aaafrgsdfgsdf');
            done();
          })
          .catch((err) => {
            console.error(err);
            done();
          });
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });

  // // Test the PUT route

  it('should try to update a players info', (done) => {
    request(app)
      .get('/api/player/clyde')
      .expect(200)
      .then(({ text }) => {
        const data = JSON.parse(text);
        expect(data).toBeDefined();
        const { _id } = data;
        request(app)
          .put(`/api/player/${_id}`)
          .send({
            username: 'clyde',
            password: 'cartmanREALLYSux',
            sessionId: 'aaafrgsdf121111f',
            wins: 21,
            losses: 55,
            balance: 10,
          })
          .expect(202, done);
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });

  it('should verify a players info was updated', (done) => {
    request(app)
      .get('/api/player/clyde')
      .expect(200)
      .then(({ text }) => {
        const { username, sessionId, balance, losses } = JSON.parse(text);
        expect(username).toBe('clyde');
        expect(sessionId).toBe('aaafrgsdf121111f');
        expect(balance).toBe(10);
        expect(losses).toBe(55);
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });

  // // Test the DELETE route

  it('should try to delete a player', (done) => {
    request(app)
      .get('/api/player/clyde')
      .expect(200)
      .then(({ text }) => {
        const data = JSON.parse(text);
        expect(data).toBeDefined();
        const { _id } = data;
        request(app)
          .delete(`/api/player/${_id}`)
          .expect(202, done);
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });

  it('should verify a players info was deleted', (done) => {
    request(app)
      .get('/api/player/clyde')
      .expect(404)
      .then(({ text }) => {
        expect(text).toBe('content not found');
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });
});
