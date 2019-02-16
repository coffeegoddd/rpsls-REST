const request = require('supertest');
const app = require('../../../www/api/app');

describe('Test api routes for application', () => {
  // Test the GET routes
  it('has good code', (done) => {
    request(app)
      .get('/api/players')
      .expect(200, done);
  });
});
