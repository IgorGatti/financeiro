const User = require('../models/User');

class AuthController {
    // Renderiza a página de login
    getLogin(req, res) {
        res.render('auth/login', { error: null });
    }

    // Processa o login
    async postLogin(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findByUsername(username);
            
            if (!user) {
                return res.render('auth/login', { error: 'Usuário não encontrado' });
            }

            const isValid = await User.verifyPassword(user, password);
            if (!isValid) {
                return res.render('auth/login', { error: 'Senha incorreta' });
            }

            req.session.user = {
                id: user.id,
                username: user.username,
                email: user.email
            };

            res.redirect('/');
        } catch (error) {
            console.error(error);
            res.render('auth/login', { error: 'Erro ao fazer login' });
        }
    }

    // Renderiza a página de registro
    getRegister(req, res) {
        res.render('auth/register', { error: null });
    }

    // Processa o registro
    async postRegister(req, res) {
        try {
            const { username, email, password } = req.body;

            // Verificar se usuário já existe
            const existingUser = await User.findByUsername(username);
            if (existingUser) {
                return res.render('auth/register', { error: 'Nome de usuário já existe' });
            }

            // Verificar se email já existe
            const existingEmail = await User.findByEmail(email);
            if (existingEmail) {
                return res.render('auth/register', { error: 'Email já cadastrado' });
            }

            // Criar novo usuário
            await User.add({ username, email, password });
            res.redirect('/auth/login');
        } catch (error) {
            console.error('Erro detalhado no registro:', {
                message: error.message,
                stack: error.stack,
                code: error.code,
                detail: error.detail
            });
            res.render('auth/register', { 
                error: `Erro ao registrar usuário: ${error.message}`,
                debug: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    }

    // Processa o logout
    logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = new AuthController(); 