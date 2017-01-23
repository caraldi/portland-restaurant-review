module.exports = function () {
  return function errorHandler(err, req, res, next) { //eslint-disable-line no-unused-vars
    
    let code = 500, error = 'Internal Server Error';

    if(err.name === 'ValidationError' || err.name === 'CastError') {
      code = 400;
      error = err.message;
      console.log('ERROR', code, error);
    }
    else if(err.code) {
      code = err.code;
      error = err.error;
      console.log('ERROR', err.code, err.error);
    }
    else {
      console.log('ERROR', err);
    }

    res.status(code).send({error});
  };
};
