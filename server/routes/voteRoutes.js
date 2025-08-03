

const express = require('express');
const router = express.Router();
const { castVote, getResults } = require('../controllers/voteController');
const { authenticateUser, adminOnly } = require('../middleware/authMiddleware');

router.post('/:candidateId', authenticateUser, castVote);         // Voter only

// router.get('/results', authenticateUser, adminOnly, getResults);  // Admin only
router.get('/results',  getResults);  // Admin only


module.exports = router;
