const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isNotAuthenticated } = require('../middleware/auth');

// Rota padrão /auth redireciona para /auth/login
router.get('/', (req, res) => {
    res.redirect('/auth/login');
});

// Rotas de autenticação
router.get('/login', isNotAuthenticated, authController.getLogin);
router.post('/login', isNotAuthenticated, authController.postLogin);
router.get('/register', isNotAuthenticated, authController.getRegister);
router.post('/register', isNotAuthenticated, authController.postRegister);
router.get('/logout', authController.logout);

module.exports = router; 