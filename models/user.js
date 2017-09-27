const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  username: String,
  password: { type: String, select: false },
  firstName: String,
  lastName: String,
  email: String,
  gameLevel: { type: Number, min: 1, max: 3, default: 1 },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
