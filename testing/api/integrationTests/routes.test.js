const request = require('supertest');
const app = require('../../../www/api/app');

describe('Test api routes for application', () => {

  // Test the GET routes

  it('should return the info of a single player', (done) => {
    request(app)
      .get('/api/player/brian')
      .set('Accept', 'text/html')
      .expect(200)
      .then((res) => {
        console.log('this is the response -->', res.text);
        done();
      })
      .catch((err) => {
        console.log('error during get route test -->', err);
        done();
      });
  });

  it('should return info of all players', (done) => {
    request(app)
      .get('/api/players')
      .expect(200, done);
  });

  // Test the POST route

  it('should create a new player', (done) => {
    request(app)
      .post('/api/player')
      .expect(201, done);
  });

  // Test the PUT route

  it('should update a players info', (done) => {
    request(app)
      .put('/api/player/123456')
      .expect(202, done);
  });

  // Test the DELETE route

  it('should delete a player', (done) => {
    request(app)
      .delete('/api/player/123456')
      .expect(202, done);
  });
});
