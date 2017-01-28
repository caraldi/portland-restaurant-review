const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');
const redirectHttp = require('./redirect-http')();
const checkDb = require('./check-connection')();
const errorHandler = require('./error-handler');
const ensureAuth = require('./auth/ensure-auth')();

app.use(morgan('dev'));
if(process.env.NODE_ENV === 'production') {
  app.use(redirectHttp);
}
app.use(cors);
app.use(express.static('./public'));

const users = require('./routes/users');
const neighborhoods = require('./routes/neighborhoods');
const restaurants = require('./routes/restaurants');

app.use(checkDb);
app.use('/api/users', users);
app.use('/api/neighborhoods', ensureAuth, neighborhoods);
app.use('/api/restaurants', ensureAuth, restaurants);

app.use(errorHandler);

module.exports = app;
