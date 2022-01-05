const mongoose = require('mongoose');

const empSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  designation: { type: String, required: true },
  phone: { type: String, required: true },
  salary: { type: String, required: true }
});

module.exports = mongoose.model('Emp', empSchema); 
