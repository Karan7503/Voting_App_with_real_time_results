// models/Vote.js
const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  voter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // voter is stored in the User model
    required: true,
    unique: true, // ensures one vote per user
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate', // candidate is now in Candidate model
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Vote', voteSchema);
