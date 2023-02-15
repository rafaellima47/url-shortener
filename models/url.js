const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const urlSchema = new Schema({
  _id: {
    type: Buffer,
    default: function() {
      return Buffer.from(crypto.randomBytes(11)).toString("hex");;
    },
    required: true,
    unique: true,
    maxlength: 11
  },
  shortenedString: {type: String, required: true, maxlength: 11},
  long: { type: String, required: true, maxlength: 2048 },
  expiration: { type: Date, required: true }
});

const Url = mongoose.model('Url', urlSchema, 'urls');

module.exports = Url;
