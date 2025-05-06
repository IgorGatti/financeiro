const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

// Example protected route
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('protected/dashboard', { user: req.session.user });
});

// Add more protected routes here
router.get('/profile', isAuthenticated, (req, res) => {
    res.render('protected/profile', { user: req.session.user });
});

module.exports = router; 