const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const db = require('./db-connection');
const app = require('../lib/app');

describe('Neighborhoods', () => {
  before(db.drop(connection));

  const request = chai.request(app);

  let neighborhood = {name: 'Arlington Heights', quadrant: 'NW'};

  it('/GET all', () => request
    .get('/api/neighborhoods')
    .then(res => assert.deepEqual(res.body, []))
  );

  it('/POST', () => request
    .post('/api/neighborhoods')
    .send(neighborhood)
    .then(({body}) => {
      assert.ok(body._id);
      assert.equal(neighborhood.name, body.name);
      neighborhood = body;
    })
  );

  let restaurant = {
    name: 'Andina'
  };

  it('/POST restaurant with neighborhood id', () => {
    restaurant.neighborhood = neighborhood._id;
    return request
      .post('/api/restaurants')
      .send(restaurant)
      .then(({body}) => restaurant = body);
  });

  it('/GET by id', () => request
    .get(`/api/neighborhoods/${neighborhood._id}`)
    .then(({body}) => {
      assert.equal(body._id, neighborhood._id);
      assert.equal(body.name, neighborhood.name);
      assert.isOk(body.restaurants);
      assert.deepEqual(body.restaurants, [restaurant]);
    })
  );


});
