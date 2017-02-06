const jwt = require('jsonwebtoken');
const secret = process.env.APP_SECRET || 'notsosecret';

module.exports = {
  sign(user) {
    return new Promise((resolve, reject) => {
      
      jwt.sign({
        id: user.id
      }, secret, null, (err, token) => {
        if (err) return reject(err);
        resolve(token);
      });
    });
  },

  verify(token) {
    return new Promise((resolve, reject) => {
      
      jwt.verify(token, secret, (err, payload) => {
        if (err) return reject(err);
        resolve(payload);
      });
    });
  }
};
