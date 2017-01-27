const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const assert = chai.assert;
const app = require('../lib/app');
const connection = require('../lib/setup-mongoose');

const request = chai.request(app);

describe('Auth', () => {
  describe('Unauthorized', () => {
    request
      .get('/api/users/invaliduser')
      .then(() => done('Status should not be 200'))
      .catch(res => {
        assert.equal(res.status, 400);
        assert.equal(res.response.body.error, 'Unauthorized, no token provided');
        done();
      })
      .catch(done);
  });

  it ('Invalid token', done => {
    request
      .get('/api/users/invaliduser')
      .set('Authorization', 'bad-token')
      .then(() => done('Status should not be 200'))
      .catch(res => {
        assert.equal(res.status, 403);
        assert.equal(res.response.body.error, 'Unauthorized, invalid token');
        done();
      })
      .catch(done);
  });
});

