const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const token = require('../auth/token');
const User = require('../models/user');

router
  .get('/', (req, res, next) => {
    User.findById(req.user.id.toString())
      .then(user => {
        if (!user) {
          throw {
            code: 404,
            error: 'User not found'
          };
        }
        else {
          return res.send(user);
        }
      })
      .catch(next);
  });

  module.exports = router;
