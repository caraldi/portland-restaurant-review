const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {type: String, require: true},
  quadrant: {type: String, required: true, enum: ['N','NW','SW','SE','NE']}
});

module.exports = mongoose.model('Neighborhood', schema);
