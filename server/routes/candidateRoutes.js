// const express = require('express');
// const router = express.Router();
// const { getAllCandidates } = require('../controllers/candidateController');
// const {authenticateUser} = require('../middleware/authMiddleware');

// const Candidate = require('../models/Candidate');

// router.get('/', authenticateUser, async (req, res) => {
//   const candidates = await Candidate.find();
//   res.json(candidates);
// });

// router.get('/candidates', authenticateUser, getAllCandidates);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { getAllCandidates } = require('../controllers/candidateController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.get('/', authenticateUser, getAllCandidates);

module.exports = router;
