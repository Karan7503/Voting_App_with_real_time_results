// const User = require('../models/User');
const Candidate = require('../models/Candidate');

const getAllCandidates = async (req, res) => {
  try {
    // const candidates = await Candidate.find({ role: 'candidate' }).select('-password');
    const candidates = await Candidate.find();
    res.status(200).json({ candidates });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

module.exports = { getAllCandidates };
