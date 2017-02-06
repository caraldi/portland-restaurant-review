const bodyParser = require('body-parser').json();
const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

router
  .get('/restaurants', (req, res, next) => {
    Restaurant.find(req.query)
      .populate('neighborhood', 'name')
      .lean()
      .then(restaurants => res.send(restaurants))
      .catch(next);
  })

  .get('/restaurants/:id', (req, res, next) => {
    const id = req.params.id;
    Restaurant.findById(id)
      .lean()
      .then(restaurant => {
        if (!restaurant) throw {
          code: 404,
          error: `Restaurant ${ id } not found`
        };
        res.send(restaurant);
      })
      .catch(next);
  })

  .post('/restaurants', bodyParser, (req, res, next) => {
    new Restaurant(req.body).save()
      .then(saved => res.send(saved))
      .catch(err => {
        next(err);
      });
  })

  .put('/restaurants/:id', bodyParser, (req, res, next) => {
    Restaurant.findByIdAndUpdate(req.params.id, req.body)
      .then(saved => res.send(saved))
      .catch(next);
  })

  .delete('restaurants/:id', (req, res, next) => {
    Restaurant.findByIdAndRemove(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  });

module.exports = router;