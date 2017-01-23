const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {type: String, required: true},
  neighborhood: {type: Schema.Types.ObjectId, ref: 'Neighborhood', required: true},
  address: {
    street: {type: String, required: true}, 
    city: {type: String, required: true}, 
    zip: {type: String, required: true}, 
    required: true
  },
  usernameId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Restaurant', schema);
