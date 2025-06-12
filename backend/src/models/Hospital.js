const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  license: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Hospital', hospitalSchema); 