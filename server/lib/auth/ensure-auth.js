const tokenVerify = require('./token');

module.exports = function getEnsureAuth() {
  return function ensureAuth(req, res, next) {
    if (req.method === 'OPTIONS') return next();

    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.replace('Bearer ', '') : '';

    if (!token) {
      return res.status(403).json({
        error: 'Unauthorized, no token provided'
      });
    }

    tokenVerify.verify(token)
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