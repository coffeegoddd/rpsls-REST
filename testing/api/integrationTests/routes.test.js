const request = require('supertest');
const { MongoClient } = require('mongodb');
const express = require('express');
const parser = require('body-parser');
const router = require('../../../www/api/routes');
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
        console.log(err);
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
        console.log(err);
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
        console.log(err);
        done();
      });
  });

  // // Test the POST route

  // it('should create a new player', (done) => {
  //   request(app)
  //     .post('/api/player')
  //     .expect(201, done);
  // });

  // // Test the PUT route

  // it('should update a players info', (done) => {
  //   request(app)
  //     .put('/api/player/123456')
  //     .expect(202, done);
  // });

  // // Test the DELETE route

  // it('should delete a player', (done) => {
  //   request(app)
  //     .delete('/api/player/123456')
  //     .expect(202, done);
  // });
});
