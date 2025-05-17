const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Mostrar formulário de login
router.get('/login', (req, res) => {
    res.render('auth/login', { error: null });
});

// Processar login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findByUsername(username);

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.render('auth/login', {
                error: 'Nome de usuário ou senha inválidos'
            });
        }

        if (!user.ativo) {
            return res.render('auth/login', {
                error: 'Conta desativada. Entre em contato com o administrador.'
            });
        }

        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            nome_completo: user.nome_completo
        };

        // Atualiza o último login
        await User.updateLastLogin(user.id);

        res.redirect('/');
    } catch (error) {
        console.error('Erro no login:', error);
        res.render('auth/login', {
            error: 'Erro ao fazer login'
        });
    }
});

// Mostrar formulário de registro
router.get('/register', (req, res) => {
    res.render('auth/register', { error: null });
});

// Processar registro
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, nome_completo } = req.body;
        
        // Validar tamanho do username
        if (username.length < 3) {
            return res.render('auth/register', {
                error: 'O nome de usuário deve ter pelo menos 3 caracteres'
            });
        }

        // Validar formato do email
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.render('auth/register', {
                error: 'Formato de email inválido'
            });
        }
        
        // Verificar se username já existe
        const existingUsername = await User.findByUsername(username);
        if (existingUsername) {
            return res.render('auth/register', {
                error: 'Nome de usuário já está em uso'
            });
        }

        // Verificar se email já existe
        const existingEmail = await User.findByEmail(email);
        if (existingEmail) {
            return res.render('auth/register', {
                error: 'Email já cadastrado'
            });
        }

        // Criar novo usuário
        await User.add({
            username,
            email,
            password,
            nome_completo
        });

        res.redirect('/auth/login');
    } catch (error) {
        console.error('Erro no registro:', error);
        res.render('auth/register', {
            error: 'Erro ao criar conta'
        });
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});

module.exports = router; 