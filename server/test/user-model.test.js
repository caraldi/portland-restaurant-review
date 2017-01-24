const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const db = require('./db');
const app = require('../lib/app');

describe('User model', () => {
  it('Validates with username and password', done => {
    const user = new User({
      username: 'testuser',
      password: 'testpass'
    });

    user.validate(err => {
      if (!err) done();
      else done(err);
    });
  });

  it('Username is required', done => {
    const user = new User({password: testpass});

    user.validate(err => {
      assert.isOk(err, 'Username is required');
      done();
    });
  });

  it('Password is required', done => {
    const user = new User({username: testuser});

    user.validate(err => {
      assert.isOk(err, 'Password is required');
      done();
    });
  });
});
