const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const app = require('../lib/app');
const connection = require('../lib/setup-mongoose');
const db = require('./db-connection');

describe('Neighborhoods', () => {
  before(db.drop(connection));

  const request = chai.request(app);

  let neighborhood = { name: 'Arlington Heights', quadrant: 'NW' };
  let restaurant = { name: 'Andina' };

  it('/GET all neighborhoods', () => request
    .get('/neighborhoods')
    .then(res => assert.deepEqual(res.body, []))
  );

  it('/POST new neighborhood', () => request
    .post('/neighborhoods')
    .send(neighborhood)
    .then(({ body }) => {
      assert.ok(body._id);
      assert.equal(neighborhood.name, body.name);
      neighborhood = body;
    })
  );

  it('/GET neighborhood by id', () => request
    .get(`/neighborhoods/${ neighborhood._id }`)
    .then(({ body }) => {
      assert.equal(body._id, neighborhood._id);
      assert.equal(body.name, neighborhood.name);
      assert.isOk(body.restaurants);
      assert.deepEqual(body.restaurants, [ restaurant ]);
    })
  );

  it('/POST restaurant with neighborhood id', () => {
    restaurant.neighborhood = neighborhood._id;
    return request
      .post('/restaurants')
      .send(restaurant)
      .then(({ body }) => restaurant = body);
  });
});