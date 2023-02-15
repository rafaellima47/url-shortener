const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const urlSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    required: true,
    unique: true,
  },
  shortenedString: {type: String, required: true, maxlength: 11},
  long: { type: String, required: true, maxlength: 2048 },
  expiration: { type: Date, required: true }
});

const Url = mongoose.model('Url', urlSchema, 'urls');

module.exports = Url;