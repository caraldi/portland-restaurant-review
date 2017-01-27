const router = require('express').Router();
const jsonParser = require('body-parser').json();
const User = require('../models/user');
const token = require('../auth/token');
const ensureAuth = require('../auth/ensure-auth')();

router.post('/signup', jsonParser, (req, res) => {
  const {username, password} = req.body;
  delete req.body.password;

  if(!password) {
    return res.status(400).json({
      msg: 'Password is required'
    });
  }

  User.findOne({username})
    .then(existing => {
      if (existing) {
        return res.status(500).json({
          msg: 'Invalid',
          reason: 'Username already in use'
        });
      }

      const user = new User(req.body);
      user.generateHash(password);
      return user.save()
        .then(user => token.sign(user))
        .then(token => res.json({token}));
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Invalid',
        reason: err
      });
    });
});

router.post('/signin', jsonParser, (req, res) => {
  const {username, password} = req.body;
  delete req.body;

  User.findOne({username})
    .then(user => {
      if(!user) {
        return res.status(400).json({
          msg: 'Unauthorized',
          reason: 'No username ' + username
        });
      }

      if(!user.compareHash(password)) {
        return res.status(400).json({
          msg: 'Unauthorized',
          reason: 'Invalid password'
        });
      }

      token.sign(user).then(token => res.json({token}));
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Invalid',
        reason: err
      });
    });
});

router.get('/validate', ensureAuth, (req, res) => {
  res.status(200).send({success: true});
});

module.exports = router;
