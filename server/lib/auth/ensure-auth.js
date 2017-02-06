const tokenVerify = require('./token');

module.exports = function ensureAuth() {
  return function ensureAuth(req, res, next) {
    if (req.method === 'OPTIONS') return next();

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next({code: 400, error: 'Unauthorized, token required'});
    }

    const [bearer, jwt] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !jwt) {
      return next({code: 400, error: 'Unauthorized, invalid token'});
    }

    tokenVerify.verify(jwt)
      .then(payload => {
        req.user = payload;
        next();
      })
      .catch(() => {
        res.status(403).json({
          error: 'Unauthorized, invalid token'
        });
      });
  };
};
