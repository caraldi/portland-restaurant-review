const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Neighborhood = require('../models/neighborhood');
const Restaurant = require('../models/restaurant');

router
  .get('/', (req, res, next) => {
    Neighborhood.find(req.query).lean()
      .then(neighborhoods => res.send(neighborhoods))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const id = req.params.id;

    Promise.all([
      Neighborhood.findById(id).lean(),
      Restaurant.find({ neighborhood: id }).lean()
    ])
    .then(([ neighborhood, restaurants ]) => {
      if (!neighborhood) throw {
        code: 404,
        error: `Neighborhood ${ id } not found`
      };
      neighborhood.restaurants = restaurants;
      res.send(neighborhood);
    })
    .catch(next);
  })

  .post('/', bodyParser, (req, res, next) => {
    new Neighborhood(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
  })

  .put('/:id', bodyParser, (req, res, next) => {
    Neighborhood.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .then(saved => res.send(saved))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    const neighborhood = req.params.id;

    Promise.all([
      Neighborhood.findByIdAndRemove(neighborhood),
      Restaurant.find({ neighborhood }).remove()
    ])
    .then(([ neighborhood ]) => res.send(neighborhood))
    .catch(next);
  });

module.exports = router; 