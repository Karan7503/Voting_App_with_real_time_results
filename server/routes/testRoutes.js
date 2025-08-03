const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../middleware/authMiddleware');
const authorizePermissions = require('../middleware/authorizePermissions')

router.get('/dashboard', authenticateUser, (req, res) => {
  res.status(200).json({
    msg: `Hello, user with ID: ${req.user.userId} and role: ${req.user.role}`,
  });
});

//admin-only route
router.get(
  "/admin",
  authenticateUser,
  authorizePermissions("admin"),
  (req, res) => {
    res.status(200).json({ msg: "Welcome Admin!" });
  }
);

// Candidate-only route (optional)
router.get(
  "/candidate",
  authenticateUser,
  authorizePermissions("candidate"),
  (req, res) => {
    res.status(200).json({ msg: "Welcome Candidate!" });
  }
);

module.exports = router;
