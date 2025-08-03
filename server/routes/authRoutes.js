const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/authController');

// Register route
router.post('/register', register);

//Login Route
router.post('/login', login);

// router.post('/register', (req, res)=>{
//     res.send('Register route post baby')
// });


module.exports = router;