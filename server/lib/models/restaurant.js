const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  neighborhoodId: { type: Schema.Types.ObjectId, ref: 'Neighborhood', required: true },
  // address: {
  //   street: String,
  //   city: String,
  //   zip: Number, 
  //   required: true
  // },
  usernameId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Restaurant', schema);