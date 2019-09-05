const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  email: { type: String },
  password: { type: String }
});

module.exports = mongoose.model('User', noteSchema);
