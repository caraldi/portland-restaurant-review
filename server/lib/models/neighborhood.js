const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  quadrant: {
    type: String,
    enum: ['N','NE','SE','SW','NW'],
    required: true
  },
  restaurants: []
});

module.exports = mongoose.model('Neighborhood', schema);