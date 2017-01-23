const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  restaurantId: {type: Schema.Types.ObjectId, ref: 'Restaurant', required: true},
  userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  rating: {type: Number, required: true, enum: [1, 2, 3, 4, 5]},
  comment: {type: String}
});

module.exports = mongoose.model('Review', schema);
