const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const token = require('../auth/token');
const User = require('../models/user');
const ensureAuth = require('../auth/ensure-auth')();

router
  .post('/validate', ensureAuth, bodyParser, (req, res, next) => { //eslint-disable-line no-unused-vars
    res.send({valid: true, username: req.user.user});
  })
  
  .post('/signup', bodyParser, (req, res, next) => {
    const {username, password} = req.body;
    if (!username || !password) {
      return next({
        code: 400,
        error: 'Valid username and password required'
      });
    }

    User
      .find({username})
      .count()
      .then(count => {
        if (count > 0) throw {code: 400, error: `Username ${username} already in use`};
        const user = new User(req.body);
        user.generateHash(password);
        return user.save();
      })
      .then(user => {
        return token.sign(user);
      }) 
      .then(token => {
        res.send({username, token});
      }) 
      .catch(next);
  })

  .post('/signin', bodyParser, (req, res, next) => {
    const {username, password} = req.body;
    delete req.body.password;

    User
      .findOne({username})
      .then(user => {
        if (!user || !user.compareHash(password)) throw {code: 400, error: 'Invalud username or password'};
        return token.sign(user);
      })
      .then(token => {
        res.send({username, token});
      })
      .catch(next);
  });

module.exports = router;
