const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  quadrant: {
    type: String,
    enum: ['N','NW','SW','SE','NE'],
    required: true
  }
});

module.exports = mongoose.model('Neighborhood', schema);
