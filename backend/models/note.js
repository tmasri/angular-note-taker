const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  title: { type: String },
  content: { type: String, require: true },
  color: { type: String },
  fontStyle: { type: String },
  user: { type: String }
});

module.exports = mongoose.model('Note', noteSchema);
