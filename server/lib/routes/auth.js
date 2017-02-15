const router = require('express').Router();
const bodyParser = require('body-parser').json();
const token = require('../auth/token');
const User = require('../models/user');
const ensureAuth = require('../auth/ensure-auth')();

router.post('/signup', bodyParser, (req, res) => {
  const { username, password } = req.body;
  delete req.body.password;

  if (!password) {
    return res.status(400).json({
      msg: 'Valid password is required'
    });
  }

  User.findOne({ username })
    .then(existing => {
      if(existing) {
        return res.status(500).json({
          msg: 'Invalid username',
          reason: 'Username already in use'
        });
      }

      const user = new User(req.body);
      user.generateHash(password);
      return user.save()
        .then(user => token.sign(user))
        .then(token => res.json({ token }));
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Invalid',
        reason: err
      });
    });
});

router.post('/signin', bodyParser, (req, res) => {
  const { username, password } = req.body;
  delete req.body.password;

  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(400).json({
          msg: 'Invalid username or password',
          reason: 'No user ' + username
        });
      }

      if(!user.compareHash(password)) {
        return res.status(400).json({
          msg: 'Invalid username or password',
          reason: 'Password does not match'
        });
      }
      
      token.sign(user).then(token => res.json({ token }));
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Invalid',
        reason: err
      });
    });
});

router.get('/validate', ensureAuth, (req, res) => {
  res.status(200).send({ success: true });
});

module.exports = router;