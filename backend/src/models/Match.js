const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  survivalScore: { type: Number },
  allocationDecision: { type: String },
  explanation: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'waitlist', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Match', matchSchema); 