const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');
const redirectHttp = require('./redirect-http')();
const checkDb = require('./check-connection')();
const errorHandler = require('./error-handler');
const ensureAuth = require('./auth/ensure-auth')();

const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');


app.use(morgan('dev'));
app.use(cors);

if(process.env.NODE_ENV === 'production') {
  app.use(redirectHttp);
}

app.use(checkDb);
app.use(errorHandler);
app.use(express.static('./public'));

app.use('/api/auth', auth);
app.use('/api/users', ensureAuth, user);
app.use('/api/reviews', ensureAuth, reviews);

module.exports = app;
