const express = require('express');
const app = express();

const checkDb = require('./check-connection')();
const cors = require('cors')();
const ensureAuth = require('./auth/ensure-auth')();
const errorHandler = require('./error-handler')();
const morgan = require('morgan');
const redirectHttp = require('./redirect-http')();

app.use(morgan('dev'));
if(process.env.NODE_ENV === 'production') {
  app.use(redirectHttp);
}
app.use(cors);
app.use(express.static('./public'));

const auth = require('./routes/auth');
const neighborhoods = require('./routes/neighborhoods');
const restaurants = require('./routes/restaurants');

app.use(checkDb);
app.use('/api/auth', auth);
app.use('/api/neighborhoods', ensureAuth, neighborhoods);
app.use('/api/restaurants', ensureAuth, restaurants);

app.use(errorHandler);

module.exports = app;